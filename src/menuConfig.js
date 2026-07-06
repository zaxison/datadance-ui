import menuHome from './assets/menu-home.svg';
import menuProject from './assets/menu-project-management.svg';
import menuData from './assets/menu-data-generation.svg';
import menuModel from './assets/menu-model-evaluation.svg';
import menuQuality from './assets/menu-quality-management.svg';
import menuTemplate from './assets/menu-template.svg';
import menuAsset from './assets/menu-asset-management.svg';
import menuOperator from './assets/menu-operator-management.svg';
import menuUser from './assets/menu-user-management.svg';
import menuTenant from './assets/menu-tenant-management.svg';
import menuDemo from './assets/menu-interaction-demo.svg';

export const defaultMenuConfig = [
  { id: 'home', label: '首页', icon: menuHome, path: '/home' },
  { id: 'project', label: '项目管理', icon: menuProject, path: '/project' },
  {
    id: 'data-production',
    label: '数据生产',
    icon: menuData,
    children: [
      { id: 'data-task', label: '任务列表', path: '/data-task' },
      { id: 'data-mytask', label: '我的任务', path: '/data-mytask' },
      { id: 'data-group', label: '组别管理', path: '/data-group' },
    ],
  },
  {
    id: 'model-evaluation',
    label: '模型评估',
    icon: menuModel,
    children: [
      { id: 'eval-question', label: '题库管理', path: '/eval-question' },
      { id: 'eval-crawl', label: '抓取任务', path: '/eval-crawl' },
      { id: 'eval-task', label: '任务列表', path: '/eval-task' },
      { id: 'eval-mytask', label: '我的任务', path: '/eval-mytask' },
      { id: 'eval-report', label: '评估报告', path: '/eval-report' },
      { id: 'eval-personnel', label: '人员标签', path: '/eval-personnel' },
      { id: 'eval-viz', label: '数据可视化', path: '/eval-viz' },
    ],
  },
  {
    id: 'quality',
    label: '质量管理',
    icon: menuQuality,
    children: [
      { id: 'quality-appeal', label: '申诉中心', path: '/quality-appeal' },
    ],
  },
  { id: 'template', label: '模板管理', icon: menuTemplate, path: '/template' },
  { id: 'asset', label: '资产管理', icon: menuAsset, path: '/asset' },
  { id: 'operator', label: '算子管理', icon: menuOperator, path: '/operator' },
  {
    id: 'user',
    label: '用户管理',
    icon: menuUser,
    children: [
      { id: 'user-tag', label: '标签管理', path: '/user-tag' },
      { id: 'user-team', label: '团队管理', path: '/user-team' },
    ],
  },
  { id: 'tenant', label: '租户管理', icon: menuTenant, path: '/tenant' },
  { id: 'demo', label: '交互演示', icon: menuDemo, path: '/demo' },
];

export function getActiveMenu(menuConfig, activePath) {
  for (const item of menuConfig) {
    if (item.path === activePath) return { item, parent: null };
    for (const child of item.children || []) {
      if (child.path === activePath) return { item: child, parent: item };
    }
  }
  return { item: menuConfig[0], parent: null };
}
