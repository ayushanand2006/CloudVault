import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { 
  Folder, File, Plus, Upload, Search, HardDrive, Users, Star, Trash2,
  Grid, List, ChevronRight, Activity, Loader2,
  Share2, ExternalLink, Download, Pencil, Info, StarOff, ArchiveRestore,
  FolderOpen, Link2, X, CloudUpload, FolderPlus, Image, FileText,
  FileSpreadsheet, Film, Music, Archive, Code, MoreVertical
} from 'lucide-react';
import Modal from '../components/Modal';
import { 
  fetchFolderContents, fetchFiles, fetchSharedWithMe, uploadFile, 
  createFolder, deleteFile, deleteFolder, setAuthToken, shareItem,
  toggleStar, toggleTrash, renameFile, renameFolder
} from '../services/api';

/* ═══════════════ CONTEXT MENU ═══════════════ */
const ContextMenu = ({ x, y, items, onClose }) => {
  const menuRef = useRef(null);
  useEffect(() => {
    const close = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) onClose(); };
    const esc = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', esc); };
  }, [onClose]);

  useEffect(() => {
    if (menuRef.current) {
      const r = menuRef.current.getBoundingClientRect();
      if (r.right > window.innerWidth) menuRef.current.style.left = `${x - r.width}px`;
      if (r.bottom > window.innerHeight) menuRef.current.style.top = `${y - r.height}px`;
    }
  }, [x, y]);

  return (
    <div ref={menuRef} className="ctx-menu" style={{ position: 'fixed', left: x, top: y, zIndex: 99999 }}>
      {items.map((item, i) => item.divider ? (
        <div key={i} className="ctx-divider" />
      ) : (
        <div key={i} onClick={() => { if (!item.disabled) { item.action(); onClose(); } }} className={`ctx-item ${item.disabled ? 'disabled' : ''} ${item.danger ? 'danger' : ''}`}>
          {item.icon && <item.icon size={18} />}
          <span className="ctx-label">{item.label}</span>
          {item.shortcut && <span className="ctx-shortcut">{item.shortcut}</span>}
        </div>
      ))}
    </div>
  );
};

/* ═══════════════ FILE ICON HELPER ═══════════════ */
const getFileIcon = (item) => {
  if (item.is_folder) return { Icon: Folder, color: '#5f6368', fill: '#5f6368', bg: '#e8eaed' };
  const type = (item.type || '').toLowerCase();
  if (type.startsWith('image/')) return { Icon: Image, color: '#d93025', fill: null, bg: '#fce8e6' };
  if (type === 'application/pdf' || type.includes('document')) return { Icon: FileText, color: '#4285f4', fill: null, bg: '#e8f0fe' };
  if (type.includes('spreadsheet') || type.includes('csv') || type.includes('excel')) return { Icon: FileSpreadsheet, color: '#0f9d58', fill: null, bg: '#e6f4ea' };
  if (type.startsWith('video/')) return { Icon: Film, color: '#d93025', fill: null, bg: '#fce8e6' };
  if (type.startsWith('audio/')) return { Icon: Music, color: '#a142f4', fill: null, bg: '#f3e8fd' };
  if (type.includes('zip') || type.includes('rar') || type.includes('tar')) return { Icon: Archive, color: '#5f6368', fill: null, bg: '#f1f3f4' };
  if (type.includes('javascript') || type.includes('json') || type.includes('html') || type.includes('css') || type.includes('xml')) return { Icon: Code, color: '#f9ab00', fill: null, bg: '#fef7e0' };
  return { Icon: File, color: '#5f6368', fill: null, bg: '#f1f3f4' };
};

/* ═══════════════ SIDEBAR ITEM ═══════════════ */
const SidebarItem = ({ icon: Icon, label, active, onClick, count }) => (
  <div onClick={onClick} className={`sidebar-nav-item ${active ? 'active' : ''}`}>
    <Icon size={20} />
    <span style={{ flex: 1 }}>{label}</span>
    {count > 0 && <span className="sidebar-badge">{count}</span>}
  </div>
);

/* ═══════════════ NICE LOADER ═══════════════ */
const NiceLoader = ({ activeTab }) => {
  const [msgIndex, setMsgIndex] = useState(0);
  const messages = {
    'My Drive': ['Fetching your personal vault...', 'Securing your files...', 'Organizing your drive...'],
    'Shared with me': ['Looking for collaborations...', 'Syncing shared access...', 'Checking shared files...'],
    'Starred': ['Finding your top picks...', 'Highlighting important gems...', 'Organizing favorites...'],
    'Trash': ['Scanning the archive...', 'Preparing the trash bin...', 'Locating deleted items...'],
    'Activity': ['Recording latest events...', 'Chronicling changes...', 'Building your timeline...'],
  }[activeTab] || ['Loading your data...', 'Please wait...', 'Almost there...'];

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="nice-loader-container">
      <div className="loader-visual">
        <div className="loader-ring" />
        <div className="loader-ring-outer" />
        <CloudUpload size={40} className="loader-center-icon" color="#1a73e8" />
      </div>
      <div className="loader-content">
        <h2 className="loader-text-main" key={msgIndex}>{messages[msgIndex]}</h2>
        <p className="loader-text-sub">Connecting to CloudVault Secure Servers</p>
      </div>
    </div>
  );
};

/* ═══════════════ MOBILE COMPONENTS ═══════════════ */
const BottomNav = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'My Drive', icon: HardDrive },
    { id: 'Shared with me', icon: Users },
    { id: 'Starred', icon: Star },
    { id: 'Trash', icon: Trash2 },
  ];
  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => (
        <div key={tab.id} onClick={() => onTabChange(tab.id)} className={`bottom-nav-item ${activeTab === tab.id ? 'active' : ''}`}>
          <tab.icon size={22} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
          <span>{tab.id === 'Shared with me' ? 'Shared' : tab.id}</span>
        </div>
      ))}
    </nav>
  );
};

const FAB = ({ onClick }) => (
  <button className="mobile-fab" onClick={onClick} title="Add new">
    <Plus size={28} color="#fff" strokeWidth={2.5} />
  </button>
);

/* ═══════════════════════════════════════════════════════
   DASHBOARD
═══════════════════════════════════════════════════════ */
const Dashboard = () => {
  const { user } = useUser();
  const { isLoaded, userId, getToken } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);
  
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('My Drive');
  const [currentFolderId, setCurrentFolderId] = useState('root');
  const [breadcrumbs, setBreadcrumbs] = useState([{ id: 'root', name: 'My Drive' }]);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [itemToShare, setItemToShare] = useState(null);
  const [shareEmail, setShareEmail] = useState('');
  const [sharePermission, setSharePermission] = useState('viewer');
  const [shareLoading, setShareLoading] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [itemToRename, setItemToRename] = useState(null);
  const [renameValue, setRenameValue] = useState('');
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);
  const [infoItem, setInfoItem] = useState(null);
  const [ctxMenu, setCtxMenu] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Drag & Drop
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const dragCounter = useRef(0);

  /* ── Data ── */
  const fetchData = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      setAuthToken(token);
      let response;
      switch (activeTab) {
        case 'My Drive': response = await fetchFolderContents(currentFolderId); break;
        case 'Shared with me': response = await fetchSharedWithMe(); break;
        case 'Starred': response = await fetchFiles({ starred: true }); break;
        case 'Trash': response = await fetchFiles({ trash: true }); break;
        default: response = await fetchFolderContents(currentFolderId);
      }
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setItems([]);
    } finally { setLoading(false); }
  };

  useEffect(() => {
    if (isLoaded && !userId) navigate('/login');
    else if (isLoaded && userId) fetchData();
  }, [isLoaded, userId, activeTab, currentFolderId]);

  /* ── Upload ── */
  const doUpload = async (file) => {
    if (!file) return;
    setIsUploading(true);
    setUploadProgress(`Uploading ${file.name}...`);
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (currentFolderId !== 'root') formData.append('parent_id', currentFolderId);
      const token = await getToken();
      setAuthToken(token);
      await uploadFile(formData);
      setUploadProgress(`✅ ${file.name} uploaded!`);
      fetchData();
      setTimeout(() => { setIsUploading(false); setUploadProgress(''); }, 2000);
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadProgress(`❌ Upload failed`);
      setTimeout(() => { setIsUploading(false); setUploadProgress(''); }, 2000);
    }
  };

  const onFileChange = async (e) => { await doUpload(e.target.files[0]); e.target.value = ''; };

  /* ── Drag & Drop ── */
  const handleDragEnter = useCallback((e) => {
    e.preventDefault(); e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault(); e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => { e.preventDefault(); e.stopPropagation(); }, []);

  const handleDrop = useCallback(async (e) => {
    e.preventDefault(); e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        await doUpload(files[i]);
      }
    }
  }, [currentFolderId]);

  /* ── Handlers ── */
  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;
    try {
      const token = await getToken();
      setAuthToken(token);
      await createFolder({ name: newFolderName, parent_id: currentFolderId === 'root' ? null : currentFolderId });
      setIsFolderModalOpen(false); setNewFolderName(''); fetchData();
    } catch (error) { console.error('Folder creation failed:', error); }
  };

  const navigateToFolder = (folder) => {
    if (activeTab !== 'My Drive') setActiveTab('My Drive');
    setBreadcrumbs(prev => [...prev, { id: folder.id, name: folder.name }]);
    setCurrentFolderId(folder.id);
    setSelectedItem(null);
  };

  const navigateBack = (index) => {
    const nb = breadcrumbs.slice(0, index + 1);
    setBreadcrumbs(nb);
    setCurrentFolderId(nb[nb.length - 1].id);
    if (activeTab !== 'My Drive') setActiveTab('My Drive');
    setSelectedItem(null);
  };

  const handleItemClick = (item) => { if (item.is_folder) navigateToFolder(item); else if (item.url) window.open(item.url, '_blank'); };
  const handleSelect = (e, item) => { e.stopPropagation(); setSelectedItem(item.id === selectedItem?.id ? null : item); };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try { const token = await getToken(); setAuthToken(token); if (itemToDelete.is_folder) await deleteFolder(itemToDelete.id); else await deleteFile(itemToDelete.id); setIsDeleteModalOpen(false); setItemToDelete(null); fetchData(); } catch (e) { console.error(e); }
  };

  const handleShare = async () => {
    if (!shareEmail.trim() || !itemToShare) return;
    setShareLoading(true); setShareMessage('');
    try { const token = await getToken(); setAuthToken(token); await shareItem({ file_id: itemToShare.id, email: shareEmail, permission: sharePermission }); setShareMessage(`✅ Shared with ${shareEmail}`); setTimeout(() => { setIsShareModalOpen(false); setShareEmail(''); setSharePermission('viewer'); setShareMessage(''); }, 1500); } catch (e) { setShareMessage(`❌ ${e.response?.data?.message || 'Failed'}`); } finally { setShareLoading(false); }
  };

  const handleRename = async () => {
    if (!renameValue.trim() || !itemToRename) return;
    try { const token = await getToken(); setAuthToken(token); if (itemToRename.is_folder) await renameFolder(itemToRename.id, { name: renameValue }); else await renameFile(itemToRename.id, renameValue); setIsRenameModalOpen(false); setItemToRename(null); fetchData(); } catch (e) { console.error(e); }
  };

  const handleToggleStar = async (item) => { try { const token = await getToken(); setAuthToken(token); await toggleStar(item.id); fetchData(); } catch (e) { console.error(e); } };
  const handleMoveToTrash = async (item) => { try { const token = await getToken(); setAuthToken(token); await toggleTrash(item.id); fetchData(); } catch (e) { console.error(e); } };
  const handleCopyLink = (item) => { if (item.url) navigator.clipboard.writeText(item.url); };
  const handleDownload = (item) => { if (item.url) { const a = document.createElement('a'); a.href = item.url; a.download = item.name; a.target = '_blank'; document.body.appendChild(a); a.click(); document.body.removeChild(a); } };

  /* ── Context Menu ── */
  const handleContextMenu = useCallback((e, item) => {
    e.preventDefault(); e.stopPropagation(); setSelectedItem(item);
    const m = [];
    if (item.is_folder) m.push({ icon: FolderOpen, label: 'Open', action: () => navigateToFolder(item) });
    else {
      if (item.url) m.push({ icon: ExternalLink, label: 'Open in new tab', action: () => window.open(item.url, '_blank') });
      m.push({ icon: Download, label: 'Download', action: () => handleDownload(item), disabled: !item.url });
    }
    m.push({ divider: true });
    m.push({ icon: Share2, label: 'Share', action: () => { setItemToShare(item); setShareEmail(''); setSharePermission('viewer'); setShareMessage(''); setIsShareModalOpen(true); } });
    m.push({ icon: Link2, label: 'Copy link', action: () => handleCopyLink(item), disabled: !item.url });
    m.push({ divider: true });
    m.push({ icon: Pencil, label: 'Rename', action: () => { setItemToRename(item); setRenameValue(item.name); setIsRenameModalOpen(true); }, shortcut: 'F2' });
    m.push({ icon: item.is_starred ? StarOff : Star, label: item.is_starred ? 'Remove from starred' : 'Add to starred', action: () => handleToggleStar(item) });
    m.push({ divider: true });
    m.push({ icon: Info, label: 'File information', action: () => { setInfoItem(item); setIsInfoPanelOpen(true); } });
    m.push({ divider: true });
    if (activeTab === 'Trash') {
      m.push({ icon: ArchiveRestore, label: 'Restore', action: () => handleMoveToTrash(item) });
      m.push({ icon: Trash2, label: 'Delete forever', action: () => { setItemToDelete(item); setIsDeleteModalOpen(true); }, danger: true });
    } else {
      m.push({ icon: Trash2, label: 'Move to trash', action: () => handleMoveToTrash(item), danger: true });
    }
    setCtxMenu({ x: e.clientX, y: e.clientY, items: m });
  }, [activeTab]);

  useEffect(() => { const c = () => setCtxMenu(null); window.addEventListener('click', c); return () => window.removeEventListener('click', c); }, []);

  const filteredItems = searchQuery ? items.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase())) : items;
  const folders = filteredItems.filter(i => i.is_folder);
  const files = filteredItems.filter(i => !i.is_folder);

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';
  const formatSize = (s) => s ? s < 1024 ? s + ' B' : s < 1048576 ? (s/1024).toFixed(1) + ' KB' : (s/1048576).toFixed(2) + ' MB' : '—';

  const getEmptyMessage = () => {
    switch(activeTab) {
      case 'Shared with me': return 'No files shared with you yet';
      case 'Starred': return 'Star files to find them quickly here';
      case 'Trash': return 'Nothing in trash';
      default: return 'Drop files here or use the "New" button';
    }
  };

  return (
    <div className={`drive-root ${isInfoPanelOpen ? 'info-open' : ''}`}
      onDragEnter={handleDragEnter} onDragLeave={handleDragLeave}
      onDragOver={handleDragOver} onDrop={handleDrop}
      onClick={() => setSelectedItem(null)}
    >
      {/* ── Context Menu ── */}
      {ctxMenu && <ContextMenu x={ctxMenu.x} y={ctxMenu.y} items={ctxMenu.items} onClose={() => setCtxMenu(null)} />}

      {/* ═══ DRAG OVERLAY ═══ */}
      {isDragging && (
        <div className="drag-overlay">
          <div className="drag-box">
            <div className="drag-icon-ring">
              <CloudUpload size={48} color="#1a73e8" />
            </div>
            <h2>Drop files to upload</h2>
            <p>Files will be uploaded to {breadcrumbs[breadcrumbs.length - 1]?.name || 'My Drive'}</p>
          </div>
        </div>
      )}

      {/* ═══ UPLOAD TOAST ═══ */}
      {isUploading && (
        <div className="upload-toast">
          <Loader2 size={18} className="spin" />
          <span>{uploadProgress}</span>
        </div>
      )}

      {/* ═══ ALL MODALS ═══ */}
      <Modal isOpen={isFolderModalOpen} onClose={() => setIsFolderModalOpen(false)} title="New folder" onConfirm={handleCreateFolder} confirmText="Create">
        <input autoFocus type="text" placeholder="Untitled folder" value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()} className="modal-input" />
      </Modal>
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title={activeTab === 'Trash' ? 'Delete forever?' : 'Move to trash?'} onConfirm={confirmDelete} confirmText={activeTab === 'Trash' ? 'Delete' : 'Move'} isDanger>
        <p style={{color:'#5f6368'}}><strong>{itemToDelete?.name}</strong> will be {activeTab === 'Trash' ? 'permanently deleted' : 'moved to trash'}.</p>
      </Modal>
      <Modal isOpen={isRenameModalOpen} onClose={() => setIsRenameModalOpen(false)} title="Rename" onConfirm={handleRename} confirmText="OK">
        <input autoFocus type="text" value={renameValue} onChange={(e) => setRenameValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleRename()} className="modal-input" />
      </Modal>
      <Modal isOpen={isShareModalOpen} onClose={() => { setIsShareModalOpen(false); setShareMessage(''); }} title={`Share "${itemToShare?.name}"`} onConfirm={handleShare} confirmText={shareLoading ? 'Sharing...' : 'Done'}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label className="modal-label">Add people</label>
            <input autoFocus type="email" placeholder="user@example.com" value={shareEmail} onChange={(e) => setShareEmail(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleShare()} className="modal-input" />
          </div>
          <div>
            <label className="modal-label">Permission</label>
            <select value={sharePermission} onChange={(e) => setSharePermission(e.target.value)} className="modal-select">
              <option value="viewer">👁️ Viewer</option>
              <option value="editor">✏️ Editor</option>
            </select>
          </div>
          {shareMessage && <p className={`share-msg ${shareMessage.startsWith('✅') ? 'success' : 'error'}`}>{shareMessage}</p>}
        </div>
      </Modal>

      <input type="file" ref={fileInputRef} onChange={onFileChange} style={{ display: 'none' }} />

      {/* ═══════════ SIDEBAR ═══════════ */}
      <aside className="sidebar">
        <div className="sidebar-logo" onClick={() => { setActiveTab('My Drive'); setCurrentFolderId('root'); setBreadcrumbs([{ id: 'root', name: 'My Drive' }]); }}>
          <div className="logo-icon"><HardDrive size={22} color="#fff" /></div>
          <span>CloudVault</span>
        </div>

        <button className="new-btn" onClick={() => setIsFolderModalOpen(true)}>
          <Plus size={22} /> New
        </button>

        <nav className="sidebar-nav">
          <SidebarItem icon={HardDrive} label="My Drive" active={activeTab === 'My Drive'} onClick={() => { setActiveTab('My Drive'); setCurrentFolderId('root'); setBreadcrumbs([{ id: 'root', name: 'My Drive' }]); }} />
          <SidebarItem icon={Users} label="Shared with me" active={activeTab === 'Shared with me'} onClick={() => setActiveTab('Shared with me')} />
          <SidebarItem icon={Star} label="Starred" active={activeTab === 'Starred'} onClick={() => setActiveTab('Starred')} />
          <SidebarItem icon={Trash2} label="Trash" active={activeTab === 'Trash'} onClick={() => setActiveTab('Trash')} />
          <div className="sidebar-divider" />
          <SidebarItem icon={Activity} label="Activity" active={activeTab === 'Activity'} onClick={() => setActiveTab('Activity')} />
        </nav>

        {/* User section */}
        {user && (
          <div className="sidebar-user" onClick={() => navigate('/account')}>
            <img src={user.imageUrl} alt="" className="sidebar-avatar" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p className="sidebar-username">{user.fullName || 'User'}</p>
              <p className="sidebar-email">{user.primaryEmailAddress?.emailAddress || ''}</p>
            </div>
          </div>
        )}
      </aside>

      {/* ═══════════ MAIN ═══════════ */}
      <main className="main-content">
        {/* ── HEADER ── */}
        <header className="topbar">
          <div className="mobile-logo" onClick={() => { setActiveTab('My Drive'); setCurrentFolderId('root'); setBreadcrumbs([{ id: 'root', name: 'My Drive' }]); }}>
            <div className="logo-icon-sm"><HardDrive size={18} color="#fff" /></div>
          </div>
          <div className="search-wrapper">
            <Search size={20} color="#5f6368" />
            <input type="text" placeholder="Search in Drive" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" />
            {searchQuery && <X size={18} className="search-clear" onClick={() => setSearchQuery('')} />}
          </div>
          <div className="topbar-actions">
            <button className="upload-btn desk-only" onClick={() => fileInputRef.current?.click()}>
              <Upload size={18} /> Upload
            </button>
            <button className="icon-btn desk-only" onClick={() => setIsFolderModalOpen(true)} title="New folder">
              <FolderPlus size={20} />
            </button>
            <div className="topbar-divider desk-only" />
            <button className="icon-btn" onClick={() => setViewMode(v => v === 'grid' ? 'list' : 'grid')} title="Toggle view">
              {viewMode === 'grid' ? <List size={20} /> : <Grid size={20} />}
            </button>
            {isInfoPanelOpen && <button className="icon-btn active" onClick={() => setIsInfoPanelOpen(false)} title="Close info"><Info size={20} /></button>}
            <button className="mobile-user-trigger mob-only" onClick={() => navigate('/account')}>
               {user?.imageUrl && <img src={user.imageUrl} alt="" className="sidebar-avatar" style={{width: 32, height: 32}} />}
            </button>
          </div>
        </header>

        {/* ── BREADCRUMBS ── */}
        <div className="breadcrumb-bar">
          {activeTab === 'My Drive' ? breadcrumbs.map((crumb, i) => (
            <React.Fragment key={crumb.id}>
              <span className={`breadcrumb ${i === breadcrumbs.length - 1 ? 'current' : ''}`} onClick={() => navigateBack(i)}>{crumb.name}</span>
              {i < breadcrumbs.length - 1 && <ChevronRight size={18} color="#80868b" />}
            </React.Fragment>
          )) : <span className="breadcrumb current">{activeTab}</span>}
        </div>

        {/* ── CONTENT ── */}
        <div className="content-area" ref={dropZoneRef}>
          {loading ? (
            <NiceLoader activeTab={activeTab} />
          ) : filteredItems.length > 0 ? (
            <div className="items-wrapper">
              {/* FOLDERS SECTION */}
              {folders.length > 0 && (
                <section className="item-section fade-in">
                  <h3 className="section-title">Folders</h3>
                  <div className={viewMode === 'grid' ? 'folder-grid' : 'list-view'}>
                    {folders.map((item, idx) => {
                      const fi = getFileIcon(item);
                      return viewMode === 'grid' ? (
                        <div key={`f-${item.id}`}
                          className={`folder-card ${selectedItem?.id === item.id ? 'selected' : ''}`}
                          style={{ animationDelay: `${idx * 0.04}s` }}
                          onClick={(e) => handleSelect(e, item)}
                          onDoubleClick={() => handleItemClick(item)}
                          onContextMenu={(e) => handleContextMenu(e, item)}
                        >
                          <div className="folder-card-icon" style={{ background: fi.bg }}>
                            <fi.Icon size={20} color={fi.color} fill={fi.fill || 'none'} />
                          </div>
                          <span className="folder-card-name">{item.name}</span>
                          {item.is_starred && <Star size={14} color="#fbbc04" fill="#fbbc04" className="star-badge" />}
                          <button className="card-more" onClick={(e) => handleContextMenu(e, item)}><MoreVertical size={16} /></button>
                        </div>
                      ) : (
                        <div key={`fl-${item.id}`}
                          className={`list-row ${selectedItem?.id === item.id ? 'selected' : ''}`}
                          style={{ animationDelay: `${idx * 0.03}s` }}
                          onClick={(e) => handleSelect(e, item)}
                          onDoubleClick={() => handleItemClick(item)}
                          onContextMenu={(e) => handleContextMenu(e, item)}
                        >
                          <fi.Icon size={20} color={fi.color} fill={fi.fill || 'none'} />
                          <span className="list-name">{item.name}</span>
                          {item.is_starred && <Star size={14} color="#fbbc04" fill="#fbbc04" />}
                          <span className="list-meta">—</span>
                          <span className="list-meta">{formatDate(item.created_at)}</span>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* FILES SECTION */}
              {files.length > 0 && (
                <section className="item-section fade-in" style={{ animationDelay: '0.1s' }}>
                  <h3 className="section-title">Files</h3>
                  {viewMode === 'grid' ? (
                    <div className="file-grid">
                      {files.map((item, idx) => {
                        const fi = getFileIcon(item);
                        return (
                          <div key={`fg-${item.id}`}
                            className={`file-card ${selectedItem?.id === item.id ? 'selected' : ''}`}
                            style={{ animationDelay: `${idx * 0.04}s` }}
                            onClick={(e) => handleSelect(e, item)}
                            onDoubleClick={() => handleItemClick(item)}
                            onContextMenu={(e) => handleContextMenu(e, item)}
                          >
                            <div className="file-card-preview">
                              {item.type?.startsWith('image/') && item.url ? (
                                <img src={item.url} alt={item.name} className="preview-img" />
                              ) : (
                                <fi.Icon size={44} color={fi.color} strokeWidth={1.2} />
                              )}
                            </div>
                            <div className="file-card-footer">
                              <div className="file-card-icon-sm" style={{ background: fi.bg }}>
                                <fi.Icon size={16} color={fi.color} />
                              </div>
                              <span className="file-card-name">{item.name}</span>
                              {item.is_starred && <Star size={12} color="#fbbc04" fill="#fbbc04" className="star-badge" />}
                              <button className="card-more" onClick={(e) => handleContextMenu(e, item)}><MoreVertical size={16} /></button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="list-view">
                      <div className="list-header">
                        <span style={{ flex: 1 }}>Name</span>
                        <span className="list-meta-header">Size</span>
                        <span className="list-meta-header">Modified</span>
                      </div>
                      {files.map((item, idx) => {
                        const fi = getFileIcon(item);
                        return (
                          <div key={`fll-${item.id}`}
                            className={`list-row ${selectedItem?.id === item.id ? 'selected' : ''}`}
                            style={{ animationDelay: `${idx * 0.03}s` }}
                            onClick={(e) => handleSelect(e, item)}
                            onDoubleClick={() => handleItemClick(item)}
                            onContextMenu={(e) => handleContextMenu(e, item)}
                          >
                            <fi.Icon size={20} color={fi.color} />
                            <span className="list-name">{item.name}</span>
                            {item.is_starred && <Star size={14} color="#fbbc04" fill="#fbbc04" />}
                            {item.permission && <span className={`perm-badge ${item.permission}`}>{item.permission}</span>}
                            <span className="list-meta">{formatSize(item.size)}</span>
                            <span className="list-meta">{formatDate(item.created_at)}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </section>
              )}
            </div>
          ) : (
            <div className="empty-state fade-in">
              <div className="empty-icon-ring">
                {activeTab === 'Trash' ? <Trash2 size={52} color="#dadce0" /> : <Folder size={52} color="#dadce0" />}
              </div>
              <h2>{searchQuery ? 'No results' : 'Nothing here yet'}</h2>
              <p>{searchQuery ? `No items match "${searchQuery}"` : getEmptyMessage()}</p>
              {!searchQuery && activeTab === 'My Drive' && (
                <button className="empty-upload-btn" onClick={() => fileInputRef.current?.click()}>
                  <Upload size={18} /> Upload files
                </button>
              )}
            </div>
          )}
        </div>

        {/* ── MOBILE UI ELEMENTS ── */}
        <FAB onClick={() => setIsFolderModalOpen(true)} />
        <BottomNav activeTab={activeTab} onTabChange={(tab) => { setActiveTab(tab); setCurrentFolderId('root'); setBreadcrumbs([{ id: 'root', name: 'My Drive' }]); }} />
      </main>

      {/* ═══ INFO PANEL ═══ */}
      {isInfoPanelOpen && infoItem && (() => {
        const fi = getFileIcon(infoItem);
        const isImage = infoItem.type?.startsWith('image/');
        return (
        <aside className="info-panel slide-in-right">
          {/* Header */}
          <div className="ip-header">
            <h3>Details</h3>
            <button className="icon-btn" onClick={() => setIsInfoPanelOpen(false)}><X size={20} /></button>
          </div>

          {/* Preview */}
          <div className="ip-preview">
            {isImage && infoItem.url ? (
              <img src={infoItem.url} alt={infoItem.name} className="ip-preview-img" />
            ) : (
              <div className="ip-icon-wrapper" style={{ background: fi.bg }}>
                <fi.Icon size={48} color={fi.color} strokeWidth={1.4} />
              </div>
            )}
            <h4 className="ip-filename">{infoItem.name}</h4>
            <span className="ip-type-badge" style={{ background: fi.bg, color: fi.color }}>
              {infoItem.is_folder ? 'Folder' : (infoItem.type?.split('/')[1]?.toUpperCase() || 'FILE')}
            </span>
          </div>

          {/* Quick Actions */}
          <div className="ip-actions">
            {!infoItem.is_folder && infoItem.url && (
              <button className="ip-action-btn" onClick={() => handleDownload(infoItem)} title="Download">
                <Download size={18} /> Download
              </button>
            )}
            <button className="ip-action-btn" onClick={() => { setItemToShare(infoItem); setShareEmail(''); setSharePermission('viewer'); setShareMessage(''); setIsShareModalOpen(true); }} title="Share">
              <Share2 size={18} /> Share
            </button>
            <button className={`ip-action-btn ${infoItem.is_starred ? 'starred' : ''}`} onClick={() => { handleToggleStar(infoItem); setInfoItem({...infoItem, is_starred: !infoItem.is_starred}); }} title="Star">
              <Star size={18} fill={infoItem.is_starred ? '#fbbc04' : 'none'} color={infoItem.is_starred ? '#fbbc04' : '#5f6368'} />
              {infoItem.is_starred ? 'Starred' : 'Star'}
            </button>
            {!infoItem.is_folder && infoItem.url && (
              <button className="ip-action-btn" onClick={() => { handleCopyLink(infoItem); }} title="Copy link">
                <Link2 size={18} /> Copy link
              </button>
            )}
          </div>

          {/* Details Section */}
          <div className="ip-details">
            <h5>File details</h5>
            <div className="ip-detail-grid">
              <div className="ip-detail-item">
                <span className="ip-detail-label">Type</span>
                <span className="ip-detail-value">{infoItem.is_folder ? 'Google Drive Folder' : (infoItem.type || 'Unknown')}</span>
              </div>
              {!infoItem.is_folder && (
                <div className="ip-detail-item">
                  <span className="ip-detail-label">Size</span>
                  <span className="ip-detail-value">{formatSize(infoItem.size)}</span>
                </div>
              )}
              <div className="ip-detail-item">
                <span className="ip-detail-label">Location</span>
                <span className="ip-detail-value ip-location">
                  <Folder size={14} color="#5f6368" />
                  {breadcrumbs[breadcrumbs.length - 1]?.name || 'My Drive'}
                </span>
              </div>
              <div className="ip-detail-item">
                <span className="ip-detail-label">Owner</span>
                <span className="ip-detail-value ip-owner">
                  {user?.imageUrl && <img src={user.imageUrl} alt="" className="ip-owner-avatar" />}
                  me
                </span>
              </div>
              <div className="ip-detail-item">
                <span className="ip-detail-label">Created</span>
                <span className="ip-detail-value">{formatDate(infoItem.created_at)}</span>
              </div>
              <div className="ip-detail-item">
                <span className="ip-detail-label">Modified</span>
                <span className="ip-detail-value">{formatDate(infoItem.updated_at || infoItem.created_at)}</span>
              </div>
            </div>
          </div>

          {/* Danger zone */}
          <div className="ip-danger">
            <button className="ip-danger-btn" onClick={() => { setItemToDelete(infoItem); setIsDeleteModalOpen(true); }}>
              <Trash2 size={16} /> Move to trash
            </button>
          </div>
        </aside>
        );
      })()}

      {/* ═══════════ STYLES ═══════════ */}
      <style>{`
        /* ── Root ── */
        .drive-root { display: flex; min-height: 100vh; background: linear-gradient(135deg, #f0f4f9 0%, #e8edf5 100%); font-family: 'Google Sans', 'Roboto', system-ui, sans-serif; color: #202124; position: relative; }

        /* ── Sidebar ── */
        .sidebar { width: 260px; background: rgba(240,244,249,0.85); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); padding: 12px 0 12px 12px; display: flex; flex-direction: column; position: sticky; top: 0; height: 100vh; overflow-y: auto; z-index: 10; border-right: 1px solid rgba(255,255,255,0.6); }
        .sidebar::-webkit-scrollbar { width: 0; }
        .sidebar-logo { display: flex; align-items: center; gap: 12px; padding: 14px 16px 24px; cursor: pointer; font-size: 1.35rem; font-weight: 600; color: #202124; transition: 0.3s; letter-spacing: -0.3px; }
        .sidebar-logo:hover { transform: scale(1.02); }
        .logo-icon { width: 44px; height: 44px; background: linear-gradient(135deg, #4285f4 0%, #1a73e8 50%, #0d47a1 100%); border-radius: 14px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(26,115,232,0.35), inset 0 1px 1px rgba(255,255,255,0.2); transition: 0.4s cubic-bezier(0.4,0,0.2,1); }
        .sidebar-logo:hover .logo-icon { transform: rotate(-8deg) scale(1.1); box-shadow: 0 8px 28px rgba(26,115,232,0.5); }
        .new-btn { display: flex; align-items: center; gap: 12px; padding: 14px 28px; margin: 0 8px 20px; border-radius: 18px; border: none; background: #fff; color: #202124; font-size: 0.95rem; font-weight: 500; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 6px 16px rgba(0,0,0,0.07); transition: all 0.3s cubic-bezier(0.4,0,0.2,1); width: fit-content; font-family: inherit; }
        .new-btn:hover { box-shadow: 0 2px 4px rgba(0,0,0,0.06), 0 12px 28px rgba(0,0,0,0.14); transform: translateY(-3px); }
        .new-btn:active { transform: translateY(0) scale(0.96); box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .sidebar-nav { flex: 1; padding-top: 6px; }
        .sidebar-nav-item { display: flex; align-items: center; gap: 14px; padding: 10px 24px; border-radius: 0 25px 25px 0; cursor: pointer; font-size: 0.9rem; font-weight: 500; margin-bottom: 3px; color: #444746; transition: all 0.25s cubic-bezier(0.4,0,0.2,1); position: relative; }
        .sidebar-nav-item:hover { background: rgba(0,0,0,0.05); }
        .sidebar-nav-item.active { background: #c2e7ff; color: #001d35; font-weight: 700; box-shadow: inset 0 0 0 1px rgba(26,115,232,0.1); }
        .sidebar-nav-item.active::before { content: ''; position: absolute; left: 0; top: 4px; bottom: 4px; width: 4px; background: #1a73e8; border-radius: 0 4px 4px 0; }
        .sidebar-badge { font-size: 0.72rem; background: rgba(232,234,237,0.8); padding: 2px 8px; border-radius: 10px; color: #5f6368; font-weight: 600; }
        .sidebar-divider { height: 1px; background: linear-gradient(90deg, transparent, #c4c7c5, transparent); margin: 16px 20px 16px 24px; opacity: 0.5; }
        .sidebar-user { display: flex; align-items: center; gap: 12px; padding: 14px 16px; margin: 8px 8px 4px 0; border-radius: 18px; cursor: pointer; transition: all 0.25s; background: rgba(255,255,255,0.5); border: 1px solid rgba(0,0,0,0.04); }
        .sidebar-user:hover { background: rgba(255,255,255,0.9); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
        .sidebar-avatar { width: 38px; height: 38px; border-radius: 50%; object-fit: cover; border: 2px solid #e0e0e0; transition: 0.3s; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
        .sidebar-user:hover .sidebar-avatar { border-color: #1a73e8; box-shadow: 0 0 0 3px rgba(26,115,232,0.15); }
        .sidebar-username { font-size: 0.85rem; font-weight: 600; color: #202124; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .sidebar-email { font-size: 0.72rem; color: #5f6368; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        /* ── Main ── */
        .main-content { flex: 1; display: flex; flex-direction: column; background: #fff; border-radius: 20px 0 0 20px; margin: 8px 0; overflow: hidden; min-width: 0; box-shadow: -4px 0 20px rgba(0,0,0,0.06), 0 0 1px rgba(0,0,0,0.1); }

        /* ── Header ── */
        .topbar { display: flex; align-items: center; padding: 12px 28px; gap: 16px; background: rgba(255,255,255,0.95); backdrop-filter: blur(12px); position: sticky; top: 0; z-index: 5; box-shadow: 0 1px 0 rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.03); }
        .search-wrapper { flex: 1; display: flex; align-items: center; gap: 12px; background: #edf2fc; border-radius: 28px; padding: 5px 20px; transition: all 0.35s cubic-bezier(0.4,0,0.2,1); border: 2px solid transparent; }
        .search-wrapper:focus-within { background: #fff; border-color: #1a73e8; box-shadow: 0 4px 20px rgba(26,115,232,0.2), 0 0 0 4px rgba(26,115,232,0.06); }
        .search-input { flex: 1; border: none; outline: none; background: transparent; font-size: 1rem; color: #202124; padding: 10px 0; font-family: inherit; }
        .search-input::placeholder { color: #80868b; }
        .search-clear { cursor: pointer; color: #5f6368; padding: 6px; border-radius: 50%; transition: 0.2s; }
        .search-clear:hover { background: #e0e0e0; }
        .topbar-actions { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
        .upload-btn { display: flex; align-items: center; gap: 8px; padding: 10px 24px; border-radius: 24px; border: none; background: linear-gradient(135deg, #1a73e8, #4285f4); color: #fff; font-size: 0.88rem; font-weight: 600; cursor: pointer; transition: all 0.25s cubic-bezier(0.4,0,0.2,1); font-family: inherit; box-shadow: 0 2px 6px rgba(26,115,232,0.3), inset 0 1px 0 rgba(255,255,255,0.15); }
        .upload-btn:hover { box-shadow: 0 6px 20px rgba(26,115,232,0.4); transform: translateY(-2px); }
        .upload-btn:active { transform: translateY(0) scale(0.96); box-shadow: 0 1px 3px rgba(26,115,232,0.3); }
        .icon-btn { width: 40px; height: 40px; border-radius: 12px; border: none; background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #5f6368; transition: all 0.2s; }
        .icon-btn:hover { background: #e8eaed; color: #202124; transform: scale(1.06); }
        .icon-btn.active { background: #e8f0fe; color: #1a73e8; }
        .topbar-divider { width: 1px; height: 28px; background: linear-gradient(180deg, transparent, #e0e0e0, transparent); margin: 0 6px; }

        /* ── Breadcrumbs ── */
        .breadcrumb-bar { display: flex; align-items: center; gap: 4px; padding: 14px 32px; font-size: 0.95rem; }
        .breadcrumb { cursor: pointer; padding: 6px 14px; border-radius: 10px; color: #5f6368; font-weight: 400; transition: all 0.2s; }
        .breadcrumb:hover { background: #f0f4f9; color: #202124; }
        .breadcrumb.current { color: #202124; font-weight: 600; cursor: default; background: #f0f4f9; }
        .breadcrumb.current:hover { background: #f0f4f9; }

        /* ── Content ── */
        .content-area { flex: 1; padding: 0 32px 32px; overflow-y: auto; scroll-behavior: smooth; }
        .items-wrapper { }
        .item-section { margin-bottom: 32px; }
        .section-title { font-size: 0.75rem; font-weight: 700; color: #80868b; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 1.2px; padding-bottom: 8px; border-bottom: 1px solid #f0f2f5; }

        /* ── Folder Cards (Grid) ── */
        .folder-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 14px; }
        .folder-card { display: flex; align-items: center; gap: 14px; padding: 14px 18px; border-radius: 16px; background: rgba(255,255,255,0.7); backdrop-filter: blur(8px); border: 1px solid rgba(0,0,0,0.06); cursor: pointer; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); position: relative; animation: cardIn 0.45s both ease-out; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
        .folder-card:hover { background: rgba(255,255,255,0.95); transform: translateY(-3px); box-shadow: 0 8px 28px rgba(0,0,0,0.09), 0 1px 3px rgba(0,0,0,0.06); }
        .folder-card.selected { border-color: #1a73e8; background: #d3e3fd; box-shadow: 0 0 0 2px rgba(26,115,232,0.2), 0 4px 12px rgba(26,115,232,0.1); }
        .folder-card-icon { width: 42px; height: 42px; border-radius: 13px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
        .folder-card:hover .folder-card-icon { transform: scale(1.12) rotate(-4deg); box-shadow: 0 4px 14px rgba(0,0,0,0.1); }
        .folder-card-name { font-size: 0.9rem; font-weight: 500; color: #202124; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; letter-spacing: -0.1px; }

        /* ── File Cards (Grid) ── */
        .file-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 14px; }
        .file-card { border-radius: 16px; background: #fff; border: 1px solid rgba(0,0,0,0.08); cursor: pointer; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); overflow: hidden; animation: cardIn 0.45s both ease-out; position: relative; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
        .file-card:hover { border-color: rgba(0,0,0,0.12); box-shadow: 0 12px 36px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.05); transform: translateY(-4px); }
        .file-card.selected { border-color: #1a73e8; box-shadow: 0 0 0 2px rgba(26,115,232,0.2), 0 4px 12px rgba(26,115,232,0.1); }
        .file-card-preview { height: 170px; background: linear-gradient(145deg, #f8f9fb 0%, #eef1f6 50%, #e8ecf3 100%); display: flex; align-items: center; justify-content: center; border-bottom: 1px solid rgba(0,0,0,0.05); overflow: hidden; position: relative; }
        .file-card-preview::after { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 30% 40%, rgba(26,115,232,0.03), transparent 60%); pointer-events: none; }
        .preview-img { width: 100%; height: 100%; object-fit: cover; transition: 0.5s cubic-bezier(0.4,0,0.2,1); }
        .file-card:hover .preview-img { transform: scale(1.1); }
        .file-card-footer { padding: 14px 16px; display: flex; align-items: center; gap: 12px; background: #fff; }
        .file-card-icon-sm { width: 32px; height: 32px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 1px 4px rgba(0,0,0,0.06); }
        .file-card-name { font-size: 0.86rem; font-weight: 500; color: #202124; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; letter-spacing: -0.1px; }

        /* ── List View ── */
        .list-view { display: flex; flex-direction: column; gap: 3px; }
        .list-header { display: flex; align-items: center; gap: 16px; padding: 10px 18px; font-size: 0.72rem; font-weight: 700; color: #80868b; border-bottom: 1px solid #f0f2f5; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
        .list-meta-header { width: 120px; text-align: right; }
        .list-row { display: flex; align-items: center; gap: 14px; padding: 11px 16px; border-radius: 12px; cursor: pointer; transition: all 0.22s cubic-bezier(0.4,0,0.2,1); animation: cardIn 0.35s both ease-out; border: 1px solid transparent; }
        .list-row:hover { background: rgba(255,255,255,0.9); border-color: rgba(0,0,0,0.06); box-shadow: 0 2px 10px rgba(0,0,0,0.06); transform: translateX(3px); }
        .list-row.selected { background: #d3e3fd; border-color: rgba(26,115,232,0.2); box-shadow: 0 2px 8px rgba(26,115,232,0.08); }
        .list-name { flex: 1; font-size: 0.9rem; color: #202124; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 500; letter-spacing: -0.1px; }
        .list-meta { width: 120px; font-size: 0.8rem; color: #80868b; text-align: right; font-variant-numeric: tabular-nums; }
        .perm-badge { font-size: 0.72rem; padding: 3px 10px; border-radius: 8px; background: #f1f3f4; color: #5f6368; font-weight: 600; }
        .perm-badge.editor { background: #e8f0fe; color: #1a73e8; }

        /* ── More Button ── */
        .card-more { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); opacity: 0; border: none; background: rgba(255,255,255,0.8); backdrop-filter: blur(4px); color: #5f6368; cursor: pointer; padding: 6px; border-radius: 8px; transition: all 0.2s; z-index: 2; }
        .folder-card:hover .card-more, .file-card:hover .card-more { opacity: 1; }
        .file-card .card-more { top: auto; bottom: 14px; right: 12px; transform: none; }
        .card-more:hover { background: rgba(0,0,0,0.1); transform: translateY(-50%) scale(1.1); }
        .file-card .card-more:hover { transform: scale(1.1); }
        .star-badge { flex-shrink: 0; filter: drop-shadow(0 1px 3px rgba(251,188,4,0.4)); }

        /* ── Empty State ── */
        .empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 120px 20px; text-align: center; animation: fadeIn 0.6s ease-out; }
        .empty-icon-ring { width: 160px; height: 160px; border-radius: 50%; background: linear-gradient(180deg, #f0f4f9, #e8eaed); display: flex; align-items: center; justify-content: center; margin-bottom: 32px; animation: float 3s ease-in-out infinite; box-shadow: 0 8px 40px rgba(0,0,0,0.07), inset 0 -4px 12px rgba(0,0,0,0.03); }
        .empty-state h2 { font-size: 1.5rem; font-weight: 500; color: #202124; margin-bottom: 10px; letter-spacing: -0.3px; }
        .empty-state p { font-size: 0.95rem; color: #5f6368; margin-bottom: 32px; max-width: 340px; line-height: 1.6; }
        .empty-upload-btn { display: flex; align-items: center; gap: 10px; padding: 13px 30px; border-radius: 24px; border: none; background: linear-gradient(135deg, #1a73e8, #4285f4); color: #fff; font-weight: 600; cursor: pointer; font-family: inherit; font-size: 0.92rem; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); box-shadow: 0 4px 14px rgba(26,115,232,0.35); }
        .empty-upload-btn:hover { box-shadow: 0 8px 28px rgba(26,115,232,0.4); transform: translateY(-3px); }
        .empty-upload-btn:active { transform: translateY(0) scale(0.97); }

        /* ── Loading ── */
        .loading-state { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 140px; gap: 16px; }

        /* ── Nice Loader ── */
        .nice-loader-container { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 120px 20px; animation: fadeIn 0.4s ease-out; }
        .loader-visual { position: relative; width: 120px; height: 120px; display: flex; align-items: center; justify-content: center; margin-bottom: 40px; }
        .loader-center-icon { z-index: 2; animation: float 3s ease-in-out infinite; }
        .loader-ring { position: absolute; width: 70px; height: 70px; border: 3px solid #1a73e8; border-radius: 40%; border-top-color: transparent; animation: spin 2s infinite linear; }
        .loader-ring-outer { position: absolute; width: 100px; height: 100px; border: 2px solid rgba(26,115,232,0.1); border-radius: 35%; border-bottom-color: #1a73e8; animation: spin 4s infinite reverse linear; }
        .loader-content { text-align: center; }
        .loader-text-main { font-size: 1.4rem; font-weight: 500; color: #202124; margin-bottom: 12px; height: 1.8rem; animation: textFade 0.6s ease-out; letter-spacing: -0.4px; }
        .loader-text-sub { font-size: 0.88rem; color: #80868b; font-weight: 500; text-transform: uppercase; letter-spacing: 1.5px; opacity: 0.7; }

        @keyframes textFade {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        /* ── Info Panel ── */
        .info-panel { width: 360px; background: #fff; border-left: 1px solid #e0e0e0; display: flex; flex-direction: column; position: sticky; top: 0; height: 100vh; overflow-y: auto; box-shadow: -4px 0 16px rgba(0,0,0,0.05); }
        .ip-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid #e8eaed; }
        .ip-header h3 { font-size: 1.1rem; font-weight: 600; color: #202124; }
        .ip-preview { display: flex; flex-direction: column; align-items: center; padding: 32px 24px 24px; gap: 14px; background: linear-gradient(180deg, #f0f4f9 0%, #fff 100%); border-bottom: 1px solid #e8eaed; }
        .ip-preview-img { width: 100%; max-height: 180px; object-fit: contain; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
        .ip-icon-wrapper { width: 88px; height: 88px; border-radius: 20px; display: flex; align-items: center; justify-content: center; }
        .ip-filename { font-size: 0.95rem; font-weight: 600; color: #202124; text-align: center; word-break: break-word; line-height: 1.4; max-width: 280px; }
        .ip-type-badge { font-size: 0.7rem; font-weight: 700; padding: 3px 12px; border-radius: 20px; letter-spacing: 0.5px; }
        .ip-actions { display: flex; flex-wrap: wrap; gap: 8px; padding: 16px 20px; border-bottom: 1px solid #e8eaed; }
        .ip-action-btn { display: flex; align-items: center; gap: 6px; padding: 8px 14px; border-radius: 20px; border: 1px solid #dadce0; background: #fff; color: #5f6368; font-size: 0.8rem; font-weight: 500; cursor: pointer; transition: all 0.2s; font-family: inherit; }
        .ip-action-btn:hover { background: #f1f3f4; border-color: #c0c0c0; color: #202124; transform: translateY(-1px); box-shadow: 0 2px 6px rgba(0,0,0,0.06); }
        .ip-action-btn:active { transform: scale(0.97); }
        .ip-action-btn.starred { background: #fef7e0; border-color: #fbbc04; color: #e37400; }
        .ip-details { padding: 20px; flex: 1; }
        .ip-details h5 { font-size: 0.72rem; font-weight: 700; color: #80868b; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 1px; }
        .ip-detail-grid { display: flex; flex-direction: column; gap: 0; }
        .ip-detail-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #f1f3f4; }
        .ip-detail-label { font-size: 0.82rem; color: #80868b; font-weight: 500; }
        .ip-detail-value { font-size: 0.84rem; color: #202124; font-weight: 500; text-align: right; max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .ip-location { display: flex; align-items: center; gap: 6px; }
        .ip-owner { display: flex; align-items: center; gap: 8px; }
        .ip-owner-avatar { width: 20px; height: 20px; border-radius: 50%; object-fit: cover; }
        .ip-danger { padding: 16px 20px; border-top: 1px solid #f1f3f4; margin-top: auto; }
        .ip-danger-btn { display: flex; align-items: center; gap: 8px; width: 100%; padding: 10px 16px; border-radius: 10px; border: 1px solid #fce8e6; background: #fff; color: #d93025; font-size: 0.85rem; font-weight: 500; cursor: pointer; transition: all 0.2s; font-family: inherit; justify-content: center; }
        .ip-danger-btn:hover { background: #fce8e6; border-color: #d93025; }

        /* ── Context Menu ── */
        .ctx-menu { background: #292a2d; border-radius: 12px; padding: 6px 0; min-width: 280px; box-shadow: 0 12px 40px rgba(0,0,0,0.5); border: 1px solid #3c3d3f; animation: ctxIn 0.15s cubic-bezier(0.2,0.9,0.3,1); font-size: 0.88rem; }
        .ctx-divider { height: 1px; background: #3c3d3f; margin: 4px 0; }
        .ctx-item { padding: 9px 18px; display: flex; align-items: center; gap: 14px; cursor: pointer; color: #e3e3e3; transition: all 0.12s; border-radius: 0; margin: 0 4px; border-radius: 8px; }
        .ctx-item:hover { background: #404144; }
        .ctx-item.disabled { opacity: 0.35; pointer-events: none; }
        .ctx-item.danger, .ctx-item.danger svg { color: #f44336 !important; }
        .ctx-label { flex: 1; }
        .ctx-shortcut { font-size: 0.72rem; color: #888; font-family: monospace; }

        /* ── Drag Overlay ── */
        .drag-overlay { position: fixed; inset: 0; z-index: 9999; background: rgba(26,115,232,0.06); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; animation: fadeIn 0.25s ease-out; }
        .drag-box { background: #fff; border-radius: 32px; padding: 70px 90px; text-align: center; border: 3px dashed #1a73e8; animation: dragPulse 2s infinite ease-in-out; box-shadow: 0 24px 80px rgba(26,115,232,0.2); }
        .drag-icon-ring { width: 110px; height: 110px; border-radius: 50%; background: linear-gradient(135deg, #e8f0fe, #d3e3fd); display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; animation: bounce 1.2s infinite cubic-bezier(0.4,0,0.2,1); box-shadow: 0 8px 24px rgba(26,115,232,0.15); }
        .drag-box h2 { font-size: 1.4rem; font-weight: 600; color: #202124; margin-bottom: 8px; }
        .drag-box p { font-size: 0.92rem; color: #5f6368; }

        /* ── Upload Toast ── */
        .upload-toast { position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%); background: #323232; color: #fff; padding: 14px 28px; border-radius: 14px; display: flex; align-items: center; gap: 12px; z-index: 9998; font-size: 0.9rem; box-shadow: 0 8px 28px rgba(0,0,0,0.3); animation: toastIn 0.35s cubic-bezier(0.2,0.9,0.3,1); }

        /* ── Modal Inputs ── */
        .modal-input { width: 100%; padding: 12px 16px; border-radius: 10px; border: 2px solid #dadce0; outline: none; font-size: 0.95rem; color: #202124; font-family: inherit; transition: 0.25s; }
        .modal-input:focus { border-color: #1a73e8; box-shadow: 0 0 0 3px rgba(26,115,232,0.12); }
        .modal-label { font-size: 0.82rem; font-weight: 500; color: #5f6368; margin-bottom: 8px; display: block; }
        .modal-select { width: 100%; padding: 12px 16px; border-radius: 10px; border: 2px solid #dadce0; outline: none; font-size: 0.95rem; color: #202124; font-family: inherit; background: #fff; cursor: pointer; transition: 0.25s; }
        .modal-select:focus { border-color: #1a73e8; }
        .share-msg { padding: 12px 16px; border-radius: 10px; font-size: 0.88rem; font-weight: 500; }
        .share-msg.success { background: #e6f4ea; color: #137333; }
        .share-msg.error { background: #fce8e6; color: #c5221f; }

        /* ── Animations ── */
        @keyframes cardIn { from { opacity: 0; transform: translateY(20px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes ctxIn { from { opacity: 0; transform: scale(0.88) translateY(-6px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes dragPulse { 0%, 100% { transform: scale(1); border-color: #1a73e8; } 50% { transform: scale(1.015); border-color: #4285f4; } }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(24px) scale(0.95); } to { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(48px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-10px) rotate(2deg); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
        .spin { animation: spin 1s linear infinite; }
        .fade-in { animation: fadeIn 0.5s ease-out; }
        .slide-in-right { animation: slideInRight 0.35s cubic-bezier(0.2,0.9,0.3,1); }
        * { user-select: none; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        input, textarea, select { user-select: text !important; }
        ::selection { background: #c2e7ff; }

        /* ═══════════════ RESPONSIVE ═══════════════ */
        .mob-only { display: none; }
        .mobile-logo { display: none; }
        .logo-icon-sm { width: 32px; height: 32px; background: linear-gradient(135deg, #4285f4 0%, #1a73e8 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(26,115,232,0.25); }
        .bottom-nav { display: none; }
        .mobile-fab { display: none; }

        @media (max-width: 768px) {
          .sidebar { display: none; }
          .main-content { border-radius: 0; margin: 0; width: 100%; box-shadow: none; }
          .topbar { padding: 10px 16px; gap: 10px; height: 64px; }
          .breadcrumb-bar { padding: 12px 16px; overflow-x: auto; white-space: nowrap; -webkit-overflow-scrolling: touch; }
          .breadcrumb-bar::-webkit-scrollbar { display: none; }
          .content-area { padding: 0 16px 100px; }
          .desk-only { display: none; }
          .mob-only { display: flex; }
          .mobile-logo { display: flex; cursor: pointer; }
          .search-wrapper { padding: 4px 16px; min-width: 0; flex: 1; }
          .search-input { font-size: 0.9rem; }
          
          .folder-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
          .file-grid { grid-template-columns: 1fr; gap: 10px; }
          .folder-card { padding: 12px; gap: 10px; border-radius: 12px; }
          .folder-card-icon { width: 36px; height: 36px; }
          .folder-card-name { font-size: 0.85rem; }
          .file-card { border-radius: 14px; }
          .file-card-preview { height: 140px; }
          
          /* Bottom Nav */
          .bottom-nav { position: fixed; bottom: 0; left: 0; right: 0; height: 75px; background: rgba(255,255,255,0.96); backdrop-filter: blur(25px); border-top: 1px solid rgba(0,0,0,0.08); display: flex; align-items: center; justify-content: space-around; z-index: 100; padding: 0 10px 20px; box-shadow: 0 -4px 20px rgba(0,0,0,0.03); }
          .bottom-nav-item { display: flex; flex-direction: column; align-items: center; gap: 4px; color: #5f6368; cursor: pointer; transition: 0.2s cubic-bezier(0.4,0,0.2,1); min-width: 64px; flex: 1; }
          .bottom-nav-item span { font-size: 0.68rem; font-weight: 500; }
          .bottom-nav-item.active { color: #1a73e8; }
          .bottom-nav-item.active span { font-weight: 700; }
          .bottom-nav-item:active { transform: scale(0.9); }
          
          /* FAB */
          .mobile-fab { position: fixed; bottom: 95px; right: 20px; width: 58px; height: 58px; border-radius: 18px; background: linear-gradient(135deg, #1a73e8, #4285f4); border: none; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 24px rgba(26,115,232,0.45), inset 0 1px 0 rgba(255,255,255,0.2); z-index: 99; cursor: pointer; transition: 0.3s cubic-bezier(0.4,0,0.2,1); }
          .mobile-fab:active { transform: scale(0.9) rotate(90deg); }

          /* Info Panel */
          .info-panel { position: fixed; left: 0; right: 0; bottom: 0; top: auto; width: 100%; height: 85vh; z-index: 2000; border-radius: 24px 24px 0 0; box-shadow: 0 -10px 40px rgba(0,0,0,0.2); animation: slideInUp 0.4s cubic-bezier(0.2,0.9,0.3,1); border-left: none; border-top: 1px solid #e0e0e0; }
          @keyframes slideInUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
          
          .ip-actions { justify-content: center; }
          .ip-preview { padding: 24px 16px; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
