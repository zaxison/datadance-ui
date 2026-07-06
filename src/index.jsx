import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import './styles.css';
import { defaultMenuConfig, getActiveMenu } from './menuConfig.js';
import logoPng from './assets/logo.png';
import avatarPng from './assets/avatar.png';
import expandDefault from './assets/expand-default.svg';
import expandHover from './assets/expand-hover.svg';
import upIcon from './assets/up.svg';
import userProfile from './assets/user-setting-profile.svg';
import userPermission from './assets/user-setting-permission.svg';
import userSwitchTenant from './assets/user-setting-switch-tenant.svg';
import userLanguage from './assets/user-setting-language.svg';
import userTimezone from './assets/user-setting-timezone.svg';
import userClearCache from './assets/user-setting-clear-cache.svg';
import userLogout from './assets/user-setting-logout.svg';

export { defaultMenuConfig } from './menuConfig.js';

const userMenuGroups = [
  [
    { label: '个人信息', icon: userProfile },
    { label: '权限申请', icon: userPermission },
  ],
  [
    { label: '切换租户', icon: userSwitchTenant, hasArrow: true },
    { label: '切换语言', icon: userLanguage, hasArrow: true },
    { label: '更换时区', icon: userTimezone, hasArrow: true },
  ],
  [
    { label: '清除缓存', icon: userClearCache },
    { label: '退出登录', icon: userLogout, danger: true },
  ],
];

export function DataDanceShell({
  activePath,
  children,
  defaultExpanded = false,
  mainClassName = '',
  menuConfig = defaultMenuConfig,
  onNavigate,
  sidebarProps,
  surfaceClassName = '',
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <DataDanceAppShell>
      <DataDanceSidebar
        activePath={activePath}
        isExpanded={isExpanded}
        menuConfig={menuConfig}
        onNavigate={onNavigate}
        setIsExpanded={setIsExpanded}
        {...sidebarProps}
      />
      <DataDanceWorkSurface mainClassName={mainClassName} surfaceClassName={surfaceClassName}>
        {children}
      </DataDanceWorkSurface>
    </DataDanceAppShell>
  );
}

export function DataDanceAppShell({ children, className = '' }) {
  return (
    <div className={['dd-shell', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}

export function DataDanceWorkSurface({ children, mainClassName = '', surfaceClassName = '' }) {
  return (
    <main className={['dd-shell-main', mainClassName].filter(Boolean).join(' ')}>
      <div className={['dd-shell-surface', surfaceClassName].filter(Boolean).join(' ')}>
        {children}
      </div>
    </main>
  );
}

export function DataDanceSidebar({
  activePath = '/home',
  avatar = avatarPng,
  isExpanded,
  logo = logoPng,
  menuConfig = defaultMenuConfig,
  onNavigate,
  setIsExpanded,
  tenant = 'Medical',
  userName = 'zhouhongxiang',
}) {
  const active = useMemo(() => getActiveMenu(menuConfig, activePath), [activePath, menuConfig]);
  const [expandedMenus, setExpandedMenus] = useState(() => active.parent ? [active.parent.id] : ['data-production']);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    if (active.parent) {
      setExpandedMenus((current) => current.includes(active.parent.id) ? current : [active.parent.id]);
    }
  }, [active.parent]);

  const navigate = (item) => {
    if (!item.path) return;
    onNavigate?.(item.path, item);
  };

  const toggleMenu = (item) => {
    if (!isExpanded) {
      setIsExpanded(true);
      setExpandedMenus([item.id]);
      return;
    }
    setExpandedMenus((current) => current.includes(item.id) ? [] : [item.id]);
  };

  return (
    <aside className={isExpanded ? 'dd-sidebar dd-sidebar-expanded' : 'dd-sidebar dd-sidebar-collapsed'}>
      <div className="dd-sidebar-header">
        <button className="dd-logo-button" onClick={() => !isExpanded && setIsExpanded(true)} type="button">
          <img className="dd-logo-img dd-logo-primary" src={logo} alt="DataDance" />
          {!isExpanded && (
            <>
              <img className="dd-logo-img dd-logo-expand-default" src={expandDefault} alt="" />
              <img className="dd-logo-img dd-logo-expand-hover" src={expandHover} alt="" />
              <Tooltip label="展开" left={40} />
            </>
          )}
        </button>
        <span className="dd-logo-text">DataDance</span>
        <button className="dd-collapse-button" onClick={() => setIsExpanded(false)} type="button" aria-label="收起">
          <CollapseIcon />
          <Tooltip label="收起" left={40} />
        </button>
      </div>

      <nav className="dd-menu">
        {menuConfig.map((item) => {
          const hasChildren = Boolean(item.children?.length);
          const childActive = hasChildren && item.children.some((child) => child.path === activePath);
          const itemActive = item.path === activePath || (!isExpanded && childActive);
          const open = expandedMenus.includes(item.id);

          return (
            <div className="dd-menu-block" key={item.id}>
              <MenuItem
                active={itemActive}
                hasArrow={hasChildren}
                icon={item.icon}
                isExpanded={isExpanded}
                isOpen={open}
                label={item.label}
                onClick={() => hasChildren ? toggleMenu(item) : navigate(item)}
                submenus={item.children}
                activePath={activePath}
                onNavigate={navigate}
              />
              {hasChildren && (
                <div className={isExpanded && open ? 'dd-submenu dd-submenu-open' : 'dd-submenu'}>
                  {item.children.map((child) => (
                    <button
                      className={child.path === activePath ? 'dd-submenu-item dd-submenu-item-active' : 'dd-submenu-item'}
                      key={child.id}
                      onClick={() => navigate(child)}
                      type="button"
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="dd-profile-wrap">
        <div
          className="dd-profile"
          onMouseEnter={() => setUserMenuOpen(true)}
          onMouseLeave={() => window.setTimeout(() => setUserMenuOpen(false), 150)}
        >
          <img className="dd-profile-avatar" src={avatar} alt="" />
          <div className="dd-profile-meta">
            <div className="dd-profile-name">{userName}</div>
            <div className="dd-profile-tenant">{tenant}</div>
          </div>
          {userMenuOpen && (
            <UserMenu
              isExpanded={isExpanded}
              onMouseEnter={() => setUserMenuOpen(true)}
              onMouseLeave={() => setUserMenuOpen(false)}
            />
          )}
        </div>
      </div>
    </aside>
  );
}

function MenuItem({ active, activePath, hasArrow, icon, isExpanded, isOpen, label, onClick, onNavigate, submenus }) {
  const [hovered, setHovered] = useState(false);
  const itemRef = React.useRef(null);
  const [popupTop, setPopupTop] = useState(0);

  const showPopup = () => {
    const rect = itemRef.current?.getBoundingClientRect();
    setPopupTop(rect ? rect.top + rect.height / 2 : 0);
    setHovered(true);
  };

  return (
    <div ref={itemRef} className="dd-menu-item-wrap" onMouseEnter={showPopup} onMouseLeave={() => setHovered(false)}>
      <button className={active ? 'dd-menu-item dd-menu-item-active' : 'dd-menu-item'} onClick={onClick} type="button">
        <img className="dd-menu-icon" src={icon} alt="" aria-hidden="true" />
        {isExpanded && <span className="dd-menu-label">{label}</span>}
        {isExpanded && hasArrow && (
          <img className={isOpen ? 'dd-menu-arrow' : 'dd-menu-arrow dd-menu-arrow-closed'} src={upIcon} alt="" aria-hidden="true" />
        )}
      </button>
      {!isExpanded && hovered && (
        submenus?.length ? (
          <div className="dd-collapsed-submenu" style={{ top: popupTop }}>
            {submenus.map((sub) => (
              <button
                className={sub.path === activePath ? 'dd-collapsed-submenu-item dd-collapsed-submenu-item-active' : 'dd-collapsed-submenu-item'}
                key={sub.id}
                onClick={() => onNavigate(sub)}
                type="button"
              >
                {sub.label}
              </button>
            ))}
          </div>
        ) : (
          <Tooltip fixed label={label} left={76} top={popupTop} />
        )
      )}
    </div>
  );
}

function UserMenu({ isExpanded, onMouseEnter, onMouseLeave }) {
  return createPortal(
    <div
      className="dd-user-menu"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        bottom: isExpanded ? 80 : 72,
        left: isExpanded ? 18 : 16,
      }}
    >
      {userMenuGroups.map((group, index) => (
        <React.Fragment key={index}>
          {index > 0 && <div className="dd-user-menu-separator" />}
          <div className="dd-user-menu-group">
            {group.map((item) => (
              <button className={item.danger ? 'dd-user-menu-item dd-user-menu-item-danger' : 'dd-user-menu-item'} key={item.label} type="button">
                <img className="dd-user-menu-icon" src={item.icon} alt="" aria-hidden="true" />
                <span className="dd-user-menu-label">{item.label}</span>
                {item.hasArrow && <img className="dd-user-menu-arrow" src={upIcon} alt="" aria-hidden="true" />}
              </button>
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>,
    document.body
  );
}

function Tooltip({ fixed = false, label, left, top }) {
  return (
    <div className={fixed ? 'dd-tooltip dd-tooltip-fixed' : 'dd-tooltip'} style={{ left, top }}>
      {label}
      <span className="dd-tooltip-arrow" />
    </div>
  );
}

function CollapseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M9 3v18" />
      <path d="m16 15-3-3 3-3" />
    </svg>
  );
}
