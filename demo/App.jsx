import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import {
  DDAlert,
  DDButton,
  DDCard,
  DDCascader,
  DDDatePicker,
  DDDrawer,
  DDIconButton,
  DDInput,
  DDModal,
  DDPagination,
  DDPageHeader,
  DDSelect,
  DDSwitch,
  DDTable,
  DDTabs,
  DDTag,
  DDTreeSelect,
  DataDanceShell,
} from '../src/index.jsx';

const statuses = [
  { label: '全部状态', value: 'all' },
  { label: '进行中', value: 'running' },
  { label: '已完成', value: 'done' },
];

const cascaderOptions = [{
  label: '数据标注',
  value: 'annotation',
  children: [{
    label: '文本标注',
    value: 'text',
    children: [
      { label: '实体识别', value: 'ner' },
      { label: '意图分类', value: 'intent' },
    ],
  }, { label: '图像标注', value: 'image' }],
}];

const treeOptions = [{
  label: '标注规范',
  value: 'rules',
  children: [
    { label: '文本分类规范', value: 'text-rules' },
    { label: '实体抽取规范', value: 'entity-rules' },
  ],
}];

function Specimen({ title, description, wide = false, children }) {
  return (
    <section className={`gallery-specimen${wide ? ' gallery-specimen-wide' : ''}`}>
      <h2>{title}</h2>
      <p>{description}</p>
      {children}
    </section>
  );
}

function Gallery() {
  const [status, setStatus] = useState('running');
  const [enabled, setEnabled] = useState(true);
  const [cascader, setCascader] = useState(['annotation', 'text', 'ner']);
  const [date, setDate] = useState('2026-07-15');
  const [tree, setTree] = useState('entity-rules');
  const [tab, setTab] = useState('components');
  const [page, setPage] = useState(2);
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const columns = [
    { key: 'name', title: '组件', dataIndex: 'name' },
    { key: 'source', title: '设计来源', dataIndex: 'source' },
    { key: 'state', title: '状态', dataIndex: 'state', render: (value) => <DDTag color="success">{value}</DDTag> },
  ];

  return (
    <div className="gallery-page">
      <DDPageHeader
        title="DataDance UI 组件展厅"
        auxiliary={<DDIconButton title="展厅设置"><Settings size={15} /></DDIconButton>}
      >
        <div className="gallery-toolbar">
          <DDInput className="gallery-input" label="组件" placeholder="搜索组件" />
          <DDSelect className="gallery-input" label="状态" options={statuses} value="all" onChange={() => {}} />
        </div>
      </DDPageHeader>

      <div className="gallery-grid">
        <Specimen title="Button" description="尺寸、类型、语义、禁用与加载状态">
          <div className="gallery-row">
            <DDButton size="small">小按钮</DDButton>
            <DDButton>默认按钮</DDButton>
            <DDButton type="secondary">次按钮</DDButton>
            <DDButton type="outline">线框按钮</DDButton>
            <DDButton disabled>禁用</DDButton>
            <DDButton loading>加载中</DDButton>
          </div>
        </Specimen>

        <Specimen title="Input" description="普通、内置标签、错误与禁用状态">
          <div className="gallery-row">
            <DDInput className="gallery-input" placeholder="请输入内容" />
            <DDInput className="gallery-input" label="名称" placeholder="请输入" />
            <DDInput className="gallery-input" error="请输入有效名称" defaultValue="错误内容" />
            <DDInput className="gallery-input" disabled defaultValue="不可编辑" />
          </div>
        </Specimen>

        <Specimen title="Select / Switch" description="自绘下拉面板及开关状态">
          <div className="gallery-row">
            <DDSelect className="gallery-input" options={statuses} value={status} onChange={setStatus} />
            <DDSwitch checked={enabled} onChange={setEnabled} />
            <DDSwitch checked disabled />
          </div>
        </Specimen>

        <Specimen title="Cascader / TreeSelect" description="级联多列面板与树结构选中状态">
          <div className="gallery-row">
            <DDCascader className="gallery-input" options={cascaderOptions} value={cascader} onChange={setCascader} />
            <DDTreeSelect className="gallery-input" options={treeOptions} value={tree} onChange={setTree} />
          </div>
        </Specimen>

        <Specimen title="DatePicker" description="自绘日期面板，不使用浏览器原生日历">
          <DDDatePicker className="gallery-input" value={date} onChange={setDate} />
        </Specimen>

        <Specimen title="Tabs / Tags" description="紧凑页签与语义状态标签">
          <div className="gallery-stack">
            <DDTabs activeKey={tab} onChange={setTab} items={[
              { key: 'components', label: '组件' },
              { key: 'states', label: '交互状态' },
              { key: 'tokens', label: '设计变量' },
            ]} />
            <div className="gallery-row">
              <DDTag>默认</DDTag>
              <DDTag color="primary">主题</DDTag>
              <DDTag color="success">成功</DDTag>
              <DDTag color="warning">警告</DDTag>
              <DDTag color="danger">异常</DDTag>
            </div>
          </div>
        </Specimen>

        <Specimen title="Pagination" description="总数、页码、间隔与前后翻页">
          <DDPagination current={page} pageSize={20} total={268} onChange={setPage} />
        </Specimen>

        <Specimen title="Card" description="独立业务对象的内容容器">
          <DDCard style={{ maxWidth: 360, padding: 16 }}>
            <strong>数据标注组件</strong>
            <div style={{ marginTop: 8, color: '#86909c', fontSize: 13 }}>用于展示可点击、可复用的业务对象。</div>
          </DDCard>
        </Specimen>

        <Specimen title="Alert" description="信息、成功、警告与错误语义" wide>
          <div className="gallery-stack">
            <DDAlert title="信息提示">这里是一条需要关注的说明。</DDAlert>
            <DDAlert type="success" title="操作成功">数据已经保存并同步。</DDAlert>
            <DDAlert type="warning" title="需要检查">仍有字段没有填写。</DDAlert>
            <DDAlert type="danger" title="提交失败">请检查网络后重试。</DDAlert>
          </div>
        </Specimen>

        <Specimen title="Table" description="40px 紧凑表格行与状态单元格" wide>
          <DDTable columns={columns} data={[
            { id: 1, name: 'Button', source: '按钮/Button', state: '已收录' },
            { id: 2, name: 'Select', source: '选择器/Select', state: '已收录' },
            { id: 3, name: 'DatePicker', source: '日期选择器/Datepicker', state: '已收录' },
          ]} />
        </Specimen>

        <Specimen title="Modal / Drawer" description="遮罩、标题、正文与操作区" wide>
          <div className="gallery-row">
            <DDButton type="secondary" onClick={() => setModalOpen(true)}>打开对话框</DDButton>
            <DDButton type="secondary" onClick={() => setDrawerOpen(true)}>打开抽屉</DDButton>
          </div>
        </Specimen>
      </div>

      <DDModal open={modalOpen} title="确认保存组件配置" onClose={() => setModalOpen(false)} footer={<><DDButton type="secondary" onClick={() => setModalOpen(false)}>取消</DDButton><DDButton onClick={() => setModalOpen(false)}>确认</DDButton></>}>
        保存后，新项目将使用当前组件配置。
      </DDModal>
      <DDDrawer open={drawerOpen} title="组件详情" onClose={() => setDrawerOpen(false)} footer={<DDButton onClick={() => setDrawerOpen(false)}>完成</DDButton>}>
        <DDInput label="组件名称" defaultValue="Select 选择器" />
      </DDDrawer>
    </div>
  );
}

export default function App() {
  return (
    <DataDanceShell activePath="/data-mytask" onNavigate={() => {}}>
      <Gallery />
    </DataDanceShell>
  );
}
