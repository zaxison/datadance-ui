import React, { useEffect, useRef, useState } from 'react';
import { CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal, X } from 'lucide-react';

function cn(...values) {
  return values.flat(Infinity).filter(Boolean).join(' ');
}

const buttonSizeClasses = {
  mini: 'h-[24px] px-[10px] text-[13px] leading-[22px]',
  small: 'h-[28px] px-[12px] text-[13px] leading-[22px]',
  default: 'h-[32px] px-[16px] text-[13px] leading-[22px]',
  large: 'h-[36px] px-[16px] text-[13px] leading-[22px]',
};

const controlSizeClasses = {
  mini: 'h-[24px]',
  small: 'h-[28px]',
  default: 'h-[32px]',
  large: 'h-[36px]',
};

const dropdownSurfaceClass = 'absolute top-[calc(100%+2px)] z-[200] rounded-[4px] border border-[#E5E6EB] bg-white py-[4px] shadow-[0_8px_20px_rgba(29,33,41,0.12)]';

const semantic = {
  default: {
    text: 'text-[var(--primary-color)]',
    primary: 'bg-[var(--primary-color)] text-white hover:opacity-90 active:opacity-100',
    outline: 'bg-white text-[var(--primary-color)] shadow-[0_0_0_1px_var(--primary-color)] hover:bg-[var(--primary-bg-light)]',
    textButton: 'bg-transparent text-[var(--primary-color)] hover:bg-[var(--primary-bg-light)]',
  },
  danger: {
    text: 'text-[#F53F3F]',
    primary: 'bg-[#F53F3F] text-white hover:bg-[#D92D2D]',
    outline: 'bg-white text-[#F53F3F] shadow-[0_0_0_1px_#F53F3F] hover:bg-[#FFF5F6]',
    textButton: 'bg-transparent text-[#F53F3F] hover:bg-[#FFF5F6]',
  },
  success: {
    text: 'text-[#2BA471]',
    primary: 'bg-[#2BA471] text-white hover:bg-[#168A5A]',
    outline: 'bg-white text-[#2BA471] shadow-[0_0_0_1px_#2BA471] hover:bg-[#E8FFEA]',
    textButton: 'bg-transparent text-[#2BA471] hover:bg-[#E8FFEA]',
  },
  warning: {
    text: 'text-[#FF7D00]',
    primary: 'bg-[#FF7D00] text-white hover:bg-[#D96A00]',
    outline: 'bg-white text-[#FF7D00] shadow-[0_0_0_1px_#FF7D00] hover:bg-[#FFF7E8]',
    textButton: 'bg-transparent text-[#FF7D00] hover:bg-[#FFF7E8]',
  },
};

export function DDButton({
  children,
  className,
  disabled = false,
  icon,
  iconOnly = false,
  loading = false,
  htmlType = 'button',
  semantic: semanticKey = 'default',
  size = 'default',
  type = 'primary',
  ...props
}) {
  const palette = semantic[semanticKey] || semantic.default;
  const visual = type === 'primary'
    ? palette.primary
    : type === 'outline'
      ? palette.outline
      : type === 'text'
        ? palette.textButton
        : 'bg-[#F6F8FA] text-[#3F3F51] shadow-[0_0_0_1px_#DDE2E9,0_2px_1px_rgba(0,0,0,0.08)] hover:bg-[#F2F3F5]';
  const square = iconOnly ? {
    mini: 'w-[24px] px-0',
    small: 'w-[28px] px-0',
    default: 'w-[32px] px-0',
    large: 'w-[36px] px-0',
  }[size] : '';

  return (
    <button
      className={cn(
        'inline-flex shrink-0 items-center justify-center gap-[8px] rounded-[6px] font-medium tracking-[0.039px] transition-colors focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--primary-bg-light),0_0_0_1px_var(--primary-color)] disabled:cursor-not-allowed disabled:bg-[#F6F8FA] disabled:text-[#C3C3DA] disabled:shadow-[0_0_0_1px_#E2E5F1]',
        buttonSizeClasses[size],
        visual,
        square,
        className
      )}
      disabled={disabled || loading}
      type={htmlType}
      {...props}
    >
      {loading ? <span className="h-[14px] w-[14px] animate-spin rounded-full border-[2px] border-current border-t-transparent" /> : icon}
      {!iconOnly && children}
    </button>
  );
}

export function DDIconButton({ children, className, title, ...props }) {
  return (
    <DDButton
      aria-label={title}
      className={className}
      icon={children}
      iconOnly
      title={title}
      type="secondary"
      {...props}
    />
  );
}

export function DDInput({
  className,
  disabled = false,
  error,
  label,
  prefix,
  size = 'default',
  suffix,
  ...props
}) {
  if (label) {
    return (
      <label className={cn('flex min-w-0 flex-col', className)}>
        <span className={cn('flex min-w-0 items-stretch rounded-[6px]', controlSizeClasses[size])}>
        <span className="flex h-full shrink-0 items-center rounded-l-[6px] bg-white px-[12px] text-[13px] leading-[22px] tracking-[0.039px] text-[#3F3F51] shadow-[0_0_0_1px_#E2E5F1]">
          {label}
        </span>
        <InputCore className="rounded-l-none rounded-r-[6px]" disabled={disabled} error={error} prefix={prefix} size={size} suffix={suffix} {...props} />
        </span>
        {error && <span className="mt-[4px] text-[12px] leading-[20px] text-[#F53F3F]">{error}</span>}
      </label>
    );
  }

  return (
    <label className={cn('flex min-w-0 flex-col', className)}>
      <InputCore disabled={disabled} error={error} prefix={prefix} size={size} suffix={suffix} {...props} />
      {error && <span className="mt-[4px] text-[12px] leading-[20px] text-[#F53F3F]">{error}</span>}
    </label>
  );
}

function InputCore({ className, disabled, error, prefix, size, suffix, ...props }) {
  return (
    <span className={cn('relative flex min-w-0 flex-1 items-center rounded-[6px] bg-white px-[12px] py-[5px] text-[13px] leading-[22px] tracking-[0.039px] shadow-[0_0_0_1px_#E2E5F1] transition-all focus-within:z-[1] focus-within:shadow-[0_0_0_1px_var(--primary-color)]', controlSizeClasses[size], disabled && 'bg-[#F6F8FA]', error && 'shadow-[0_0_0_1px_#F53F3F] focus-within:shadow-[0_0_0_1px_#F53F3F]', className)}>
      {prefix && <span className="mr-[6px] shrink-0 text-[#86909C]">{prefix}</span>}
      <input
        className="h-full min-w-0 flex-1 bg-transparent text-[#1D2129] outline-none placeholder:text-[#737A87] disabled:cursor-not-allowed disabled:text-[#C3C3DA]"
        disabled={disabled}
        {...props}
      />
      {suffix && <span className="ml-[6px] shrink-0 text-[#86909C]">{suffix}</span>}
    </span>
  );
}

export function DDSelect({
  className,
  disabled = false,
  label,
  multiple = false,
  onChange,
  optionLabel = (option) => option.label ?? option,
  optionValue = (option) => option.value ?? option,
  options = [],
  placeholder = '请选择',
  size = 'default',
  value,
}) {
  const [open, setOpen] = useState(false);
  const selectedValues = multiple ? (Array.isArray(value) ? value : []) : [];
  const selectedIndex = Math.max(0, options.findIndex((option) => (
    multiple ? selectedValues.includes(optionValue(option)) : optionValue(option) === value
  )));
  const [activeIndex, setActiveIndex] = useState(selectedIndex);
  const rootRef = useRef(null);
  const listRef = useRef(null);
  const selectedOption = options.find((option) => optionValue(option) === value);
  const selectedOptions = multiple
    ? options.filter((option) => selectedValues.includes(optionValue(option)))
    : [];
  const displayValue = selectedOption ? optionLabel(selectedOption) : '';

  useEffect(() => {
    setActiveIndex(selectedIndex);
  }, [selectedIndex]);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const activeNode = listRef.current?.querySelector(`[data-dd-option-index="${activeIndex}"]`);
    activeNode?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, open]);

  const chooseOption = (option) => {
    if (disabled) return;
    const nextValue = optionValue(option);
    if (multiple) {
      const nextValues = selectedValues.includes(nextValue)
        ? selectedValues.filter((item) => item !== nextValue)
        : [...selectedValues, nextValue];
      onChange?.(nextValues, option);
      return;
    }
    onChange?.(nextValue, option);
    setOpen(false);
  };

  const removeOption = (event, option) => {
    event.preventDefault();
    event.stopPropagation();
    if (disabled) return;
    const removedValue = optionValue(option);
    onChange?.(selectedValues.filter((item) => item !== removedValue), option);
  };

  const handleKeyDown = (event) => {
    if (disabled) return;
    if (event.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!open) setOpen(true);
      else setActiveIndex((current) => Math.min(options.length - 1, current + 1));
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!open) setOpen(true);
      else setActiveIndex((current) => Math.max(0, current - 1));
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!open) setOpen(true);
      else if (options[activeIndex]) chooseOption(options[activeIndex]);
    }
  };

  return (
    <div ref={rootRef} className={cn('relative flex min-w-0 items-stretch rounded-[4px]', controlSizeClasses[size], className)}>
      {label && (
        <span className="flex h-full shrink-0 items-center rounded-l-[4px] bg-white px-[12px] text-[13px] leading-[22px] tracking-[0.039px] text-[#3F3F51] shadow-[0_0_0_1px_#DDE2E9]">
          {label}
        </span>
      )}
      <span className="relative min-w-0 flex-1">
        <button
          type="button"
          aria-disabled={disabled}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-label={label || placeholder}
          className={cn(
            'dd-select-trigger flex h-full w-full items-center overflow-hidden bg-white px-[12px] py-[5px] pr-[32px] text-left text-[13px] leading-[22px] tracking-[0.039px] text-[#1D2129] outline-none transition-shadow hover:relative hover:z-[1] focus:relative focus:z-[1]',
            disabled && 'cursor-not-allowed bg-[#F6F8FA] text-[#C9CDD4] hover:shadow-[0_0_0_1px_#DDE2E9]',
            open && 'dd-select-trigger-open relative z-[2]',
            label ? 'rounded-r-[4px]' : 'rounded-[4px]',
          )}
          disabled={disabled}
          onClick={() => !disabled && setOpen((current) => !current)}
          onKeyDown={handleKeyDown}
        >
          {multiple ? (
            <span className="flex min-w-0 flex-1 items-center gap-[4px] overflow-hidden">
              {selectedOptions.length > 0 ? selectedOptions.map((option) => (
                <span key={optionValue(option)} className="inline-flex h-[20px] max-w-[92px] shrink-0 items-center gap-[3px] rounded-[3px] bg-[#F2F3F5] px-[6px] text-[12px] leading-[20px] text-[#4E5969]">
                  <span className="truncate">{optionLabel(option)}</span>
                  <X
                    aria-label={`移除${optionLabel(option)}`}
                    className="h-[11px] w-[11px] shrink-0 cursor-pointer text-[#86909C] hover:text-[#4E5969]"
                    onClick={(event) => removeOption(event, option)}
                  />
                </span>
              )) : <span className="truncate text-[#86909C]">{placeholder}</span>}
            </span>
          ) : (
            <span className={cn('min-w-0 flex-1 truncate', !displayValue && 'text-[#86909C]')}>
              {displayValue || placeholder}
            </span>
          )}
          <ChevronDown className={cn('pointer-events-none absolute right-[10px] top-1/2 h-[12px] w-[12px] -translate-y-1/2 text-[#86909C] transition-transform', open && 'rotate-180')} />
        </button>

        {open && (
          <div
            ref={listRef}
            role="listbox"
            aria-multiselectable={multiple || undefined}
            className={cn(dropdownSurfaceClass, 'left-0 right-0 max-h-[260px] overflow-y-auto')}
          >
            {options.map((option, index) => {
              const currentValue = optionValue(option);
              const selected = multiple ? selectedValues.includes(currentValue) : currentValue === value;
              const active = index === activeIndex;
              return (
                <button
                  key={currentValue}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  data-dd-option-index={index}
                  className={cn(
                    'flex h-[34px] w-full items-center gap-[8px] px-[12px] text-left text-[13px] leading-[22px] tracking-[0.039px] transition-colors',
                    selected
                      ? 'bg-[#F2F5FF] text-[#1D2129]'
                      : active
                        ? 'bg-[#F6F8FA] text-[#1D2129]'
                        : 'text-[#1D2129] hover:bg-[#F6F8FA]'
                  )}
                  onClick={() => chooseOption(option)}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  {multiple && (
                    <span className={cn(
                      'flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-[2px] shadow-[inset_0_0_0_1px_#DDE2E9]',
                      selected && 'bg-[#3370FF] text-white shadow-none'
                    )}>
                      {selected && <Check size={10} strokeWidth={2.5} />}
                    </span>
                  )}
                  <span className="min-w-0 flex-1 truncate">{optionLabel(option)}</span>
                </button>
              );
            })}
          </div>
        )}
      </span>
    </div>
  );
}

export function DDSwitch({ checked, className, disabled = false, onChange }) {
  return (
    <button
      type="button"
      aria-checked={checked}
      className={cn(
        'relative inline-flex h-[22px] w-[40px] shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--primary-bg-light),0_0_0_1px_var(--primary-color)] disabled:cursor-not-allowed disabled:opacity-60',
        checked ? 'bg-[var(--primary-color)]' : 'bg-[#C9CDD4]',
        className
      )}
      disabled={disabled}
      onClick={() => !disabled && onChange?.(!checked)}
    >
      <span className={cn('absolute h-[18px] w-[18px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.2)] transition-transform', checked ? 'translate-x-[20px]' : 'translate-x-[2px]')} />
    </button>
  );
}

export function DDCascader({
  className,
  disabled = false,
  onChange,
  options = [],
  placeholder = '请选择',
  value = [],
}) {
  const [open, setOpen] = useState(false);
  const [activePath, setActivePath] = useState(value);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [open]);

  const columns = [];
  let currentOptions = options;
  let depth = 0;
  while (currentOptions?.length) {
    columns.push({ depth, options: currentOptions });
    const activeValue = activePath[depth];
    const activeOption = currentOptions.find((option) => option.value === activeValue);
    currentOptions = activeOption?.children;
    depth += 1;
  }

  const selectedLabels = [];
  let selectedOptions = options;
  for (const selectedValue of value) {
    const selected = selectedOptions?.find((option) => option.value === selectedValue);
    if (!selected) break;
    selectedLabels.push(selected.label);
    selectedOptions = selected.children;
  }

  const handlePick = (option, depthIndex) => {
    const nextPath = [...activePath.slice(0, depthIndex), option.value];
    setActivePath(nextPath);
    if (!option.children?.length) {
      onChange?.(nextPath);
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className={cn('relative h-[32px]', className)}>
      <button
        type="button"
        aria-expanded={open}
        className={cn(
          'flex h-full w-full items-center rounded-[6px] bg-white px-[12px] pr-[32px] text-left text-[13px] leading-[22px] tracking-[0.039px] shadow-[0_0_0_1px_#E2E5F1] outline-none transition-all focus:shadow-[0_0_0_1px_var(--primary-color)]',
          disabled && 'cursor-not-allowed bg-[#F6F8FA] text-[#C3C3DA]',
          open && 'shadow-[0_0_0_1px_var(--primary-color)]'
        )}
        disabled={disabled}
        onClick={() => !disabled && setOpen((current) => !current)}
      >
        <span className={cn('min-w-0 flex-1 truncate', !selectedLabels.length && 'text-[#737A87]')}>
          {selectedLabels.length ? selectedLabels.join(' / ') : placeholder}
        </span>
        <ChevronDown className={cn('absolute right-[10px] top-1/2 h-[12px] w-[12px] -translate-y-1/2 text-[#3F3F51] transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className={cn(dropdownSurfaceClass, 'left-0 flex max-w-[640px] overflow-hidden')}>
          {columns.map((column) => (
            <div key={column.depth} className="max-h-[260px] min-w-[156px] overflow-y-auto border-r border-[#ECEEF9] last:border-r-0">
              {column.options.map((option) => {
                const active = activePath[column.depth] === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    className={cn(
                      'flex h-[32px] w-full items-center gap-[8px] rounded-[4px] px-[12px] text-left text-[13px] leading-[22px] tracking-[0.039px]',
                      active ? 'bg-[var(--primary-bg-light)] font-medium text-[var(--primary-color)]' : 'text-[#1D2129] hover:bg-[#F6F8FA]'
                    )}
                    onClick={() => handlePick(option, column.depth)}
                    onMouseEnter={() => setActivePath((current) => [...current.slice(0, column.depth), option.value])}
                  >
                    <span className="min-w-0 flex-1 truncate">{option.label}</span>
                    {option.children?.length ? <ChevronRight size={12} /> : active ? <Check size={12} /> : null}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function DDDatePicker({ className, disabled = false, onChange, placeholder = '请选择日期', value }) {
  const [open, setOpen] = useState(false);
  const initial = value ? new Date(value) : new Date();
  const [viewDate, setViewDate] = useState(new Date(initial.getFullYear(), initial.getMonth(), 1));
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [open]);

  const selected = value ? new Date(value) : null;
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const format = (date) => {
    const yyyy = date.getFullYear();
    const mm = `${date.getMonth() + 1}`.padStart(2, '0');
    const dd = `${date.getDate()}`.padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const shiftMonth = (offset) => setViewDate((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1));

  return (
    <div ref={rootRef} className={cn('relative h-[32px]', className)}>
      <button
        type="button"
        className={cn(
          'flex h-full w-full items-center rounded-[6px] bg-white px-[12px] pr-[34px] text-left text-[13px] leading-[22px] tracking-[0.039px] shadow-[0_0_0_1px_#E2E5F1] outline-none transition-all focus:shadow-[0_0_0_1px_var(--primary-color)]',
          disabled && 'cursor-not-allowed bg-[#F6F8FA] text-[#C3C3DA]',
          open && 'shadow-[0_0_0_1px_var(--primary-color)]'
        )}
        disabled={disabled}
        onClick={() => !disabled && setOpen((current) => !current)}
      >
        <span className={cn('min-w-0 flex-1 truncate', !value && 'text-[#737A87]')}>{value || placeholder}</span>
        <CalendarDays className="absolute right-[10px] top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-[#86909C]" />
      </button>
      {open && (
        <div className={cn(dropdownSurfaceClass, 'left-0 w-[264px] p-[12px]')}>
          <div className="mb-[8px] flex h-[28px] items-center justify-between">
            <button type="button" className="h-[24px] rounded-[4px] px-[8px] text-[#4E5969] hover:bg-[#F6F8FA]" onClick={() => shiftMonth(-1)}>‹</button>
            <div className="text-[13px] font-medium leading-[22px] text-[#1D2129]">{year}年{month + 1}月</div>
            <button type="button" className="h-[24px] rounded-[4px] px-[8px] text-[#4E5969] hover:bg-[#F6F8FA]" onClick={() => shiftMonth(1)}>›</button>
          </div>
          <div className="grid grid-cols-7 gap-[4px] text-center text-[12px] leading-[20px] text-[#86909C]">
            {['日', '一', '二', '三', '四', '五', '六'].map((day) => <div key={day}>{day}</div>)}
          </div>
          <div className="mt-[4px] grid grid-cols-7 gap-[4px]">
            {cells.map((day, index) => {
              const date = day ? new Date(year, month, day) : null;
              const dateValue = date ? format(date) : '';
              const isSelected = selected && date && format(selected) === dateValue;
              return (
                <button
                  key={`${day || 'blank'}-${index}`}
                  type="button"
                  disabled={!day}
                  className={cn(
                    'h-[28px] rounded-[4px] text-[13px] leading-[22px]',
                    !day && 'cursor-default',
                    day && !isSelected && 'text-[#1D2129] hover:bg-[#F6F8FA]',
                    isSelected && 'bg-[var(--primary-color)] font-medium text-white'
                  )}
                  onClick={() => {
                    if (!date) return;
                    onChange?.(dateValue);
                    setOpen(false);
                  }}
                >
                  {day || ''}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function DDTreeSelect({ className, onChange, options = [], placeholder = '请选择', value }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [open]);

  const findLabel = (nodes) => {
    for (const node of nodes) {
      if (node.value === value) return node.label;
      const child = node.children ? findLabel(node.children) : null;
      if (child) return child;
    }
    return '';
  };

  const selectedLabel = findLabel(options);

  const renderNode = (node, depth = 0) => {
    const selected = node.value === value;
    return (
      <div key={node.value}>
        <button
          type="button"
          className={cn(
            'flex h-[32px] w-full items-center gap-[6px] rounded-[4px] px-[8px] text-left text-[13px] leading-[22px]',
            selected ? 'bg-[var(--primary-bg-light)] font-medium text-[var(--primary-color)]' : 'text-[#1D2129] hover:bg-[#F6F8FA]'
          )}
          style={{ paddingLeft: `${8 + depth * 18}px` }}
          onClick={() => {
            if (node.children?.length) return;
            onChange?.(node.value, node);
            setOpen(false);
          }}
        >
          {node.children?.length ? <ChevronDown size={12} className="text-[#86909C]" /> : <span className="w-[12px]" />}
          <span className="min-w-0 flex-1 truncate">{node.label}</span>
          {selected && <Check size={12} />}
        </button>
        {node.children?.map((child) => renderNode(child, depth + 1))}
      </div>
    );
  };

  return (
    <div ref={rootRef} className={cn('relative h-[32px]', className)}>
      <button
        type="button"
        className={cn('flex h-full w-full items-center rounded-[6px] bg-white px-[12px] pr-[32px] text-left text-[13px] leading-[22px] tracking-[0.039px] shadow-[0_0_0_1px_#E2E5F1] outline-none transition-all focus:shadow-[0_0_0_1px_var(--primary-color)]', open && 'shadow-[0_0_0_1px_var(--primary-color)]')}
        onClick={() => setOpen((current) => !current)}
      >
        <span className={cn('min-w-0 flex-1 truncate', !selectedLabel && 'text-[#737A87]')}>{selectedLabel || placeholder}</span>
        <ChevronDown className={cn('absolute right-[10px] top-1/2 h-[12px] w-[12px] -translate-y-1/2 text-[#3F3F51] transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className={cn(dropdownSurfaceClass, 'left-0 w-full max-h-[260px] overflow-y-auto')}>
          {options.map((node) => renderNode(node))}
        </div>
      )}
    </div>
  );
}

export function DDTabs({ items = [], activeKey, onChange, className }) {
  return (
    <div className={cn('flex h-[32px] items-center border-b border-[#ECEEF9]', className)}>
      <div className="flex items-start gap-[6px]">
        {items.map((item) => {
          const active = item.key === activeKey;
          return (
            <button
              key={item.key}
              className={cn(
                'relative h-[32px] rounded-t-[4px] px-[16px] py-[5px] text-[13px] leading-[22px] tracking-[0.039px] transition-colors',
                active
                  ? 'border-x border-[#ECEEF9] bg-white font-medium text-[var(--primary-color)] shadow-[inset_0_2px_0_var(--primary-color)]'
                  : 'border border-[#ECEEF9] bg-[#F6F8FA] text-[#3F3F51] hover:text-[#1D2129]'
              )}
              onClick={() => onChange?.(item.key)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const tagColors = {
  default: 'border-[#DDE2EA] bg-[#F7F8FA] text-[#4E5969]',
  primary: 'border-[#B8C4FF] bg-[var(--primary-bg-light)] text-[var(--primary-color)]',
  success: 'border-[#B7E7C1] bg-[#E8FFEA] text-[#2BA471]',
  warning: 'border-[#FFD8A8] bg-[#FFF7E8] text-[#FF7D00]',
  danger: 'border-[#FFC4C4] bg-[#FFF5F6] text-[#F53F3F]',
};

export function DDTag({ children, className, closable = false, color = 'default', onClose }) {
  return (
    <span className={cn('inline-flex h-[22px] items-center gap-[4px] rounded-[4px] border px-[7px] text-[12px] leading-[20px]', tagColors[color], className)}>
      {children}
      {closable && <X className="h-[12px] w-[12px] cursor-pointer" onClick={onClose} />}
    </span>
  );
}

export function DDCard({ children, className, hoverable = true, ...props }) {
  return (
    <div
      className={cn(
        'rounded-[8px] border border-[#E2E5F1] bg-white',
        hoverable && 'transition-all hover:border-[var(--primary-border)] hover:shadow-[0_8px_24px_rgba(29,33,41,0.08)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function DDTable({ columns = [], data = [], rowKey = 'id', className }) {
  return (
    <div className={cn('overflow-hidden rounded-[8px] border border-[#EAEDF1] bg-white', className)}>
      <table className="w-full border-collapse text-left">
        <thead className="bg-[#F6F7FA]">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className={cn('h-[40px] border-b border-[#EAEDF1] px-[16px] text-[13px] font-semibold leading-[20px] text-[#42464E]', column.className)}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row[rowKey]} className="h-[40px] border-b border-[#EAEDF1] last:border-b-0 hover:bg-[#F7F8FA]">
              {columns.map((column) => (
                <td key={column.key} className={cn('px-[16px] text-[13px] leading-[20px] text-[#1D2129]', column.cellClassName)}>
                  {column.render ? column.render(row[column.dataIndex], row) : row[column.dataIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function getPaginationItems(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, 'end-gap', total];
  if (current >= total - 3) return [1, 'start-gap', total - 4, total - 3, total - 2, total - 1, total];
  return [1, 'start-gap', current - 1, current, current + 1, 'end-gap', total];
}

export function DDPagination({
  className,
  current = 1,
  disabled = false,
  onChange,
  pageSize = 20,
  showTotal = true,
  total = 0,
}) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const items = getPaginationItems(current, pageCount);
  const changePage = (page) => {
    if (disabled || page < 1 || page > pageCount || page === current) return;
    onChange?.(page);
  };

  return (
    <div className={cn('flex min-h-[32px] items-center justify-between gap-[16px] text-[13px] leading-[22px] text-[#4E5969]', className)}>
      {showTotal && <span className="shrink-0">共 {total} 条</span>}
      <div className="flex items-center gap-[4px]">
        <PaginationButton aria-label="上一页" disabled={disabled || current <= 1} onClick={() => changePage(current - 1)}>
          <ChevronLeft size={14} />
        </PaginationButton>
        {items.map((item) => typeof item === 'number' ? (
          <PaginationButton active={item === current} disabled={disabled} key={item} onClick={() => changePage(item)}>
            {item}
          </PaginationButton>
        ) : (
          <span className="flex h-[28px] w-[28px] items-center justify-center text-[#86909C]" key={item}>
            <MoreHorizontal size={14} />
          </span>
        ))}
        <PaginationButton aria-label="下一页" disabled={disabled || current >= pageCount} onClick={() => changePage(current + 1)}>
          <ChevronRight size={14} />
        </PaginationButton>
      </div>
    </div>
  );
}

function PaginationButton({ active = false, children, className, ...props }) {
  return (
    <button
      type="button"
      className={cn(
        'flex h-[28px] min-w-[28px] items-center justify-center rounded-[4px] px-[6px] text-[13px] text-[#4E5969] transition-colors hover:bg-[#F2F3F5] disabled:cursor-not-allowed disabled:text-[#C9CDD4] disabled:hover:bg-transparent',
        active && 'bg-[var(--primary-color)] font-medium text-white hover:bg-[var(--primary-color)]',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

const alertStyles = {
  info: 'border-[#BEDAFF] bg-[#F2F7FF] text-[#2166FF]',
  success: 'border-[#B7E7C1] bg-[#F0FFF3] text-[#2BA471]',
  warning: 'border-[#FFD8A8] bg-[#FFF9F0] text-[#FF7D00]',
  danger: 'border-[#FFC4C4] bg-[#FFF5F6] text-[#F53F3F]',
};

export function DDAlert({ action, children, className, title, type = 'info' }) {
  return (
    <div className={cn('flex min-h-[40px] items-start justify-between gap-[12px] rounded-[6px] border px-[12px] py-[9px] text-[13px] leading-[22px]', alertStyles[type], className)}>
      <div className="min-w-0">
        {title && <div className="font-medium text-[#1D2129]">{title}</div>}
        <div>{children}</div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function DDModal({ children, footer, open, title, width = 480, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
      <div className="flex max-h-[86vh] flex-col overflow-hidden rounded-[8px] bg-white shadow-[0_24px_64px_rgba(0,0,0,0.24)]" style={{ width }}>
        <div className="flex h-[56px] shrink-0 items-center justify-between border-b border-[#E5E6EB] px-[20px]">
          <div className="text-[16px] font-medium leading-[24px] text-[#020814]">{title}</div>
          <button className="flex h-[28px] w-[28px] items-center justify-center rounded-[4px] text-[#4E5969] hover:bg-[#F2F3F5]" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-auto p-[20px] text-[14px] leading-[22px] text-[#1D2129]">{children}</div>
        {footer && <div className="flex h-[64px] shrink-0 items-center justify-end gap-[12px] border-t border-[#E5E6EB] px-[20px]">{footer}</div>}
      </div>
    </div>
  );
}

export function DDDrawer({ children, footer, open, placement = 'right', title, width = 480, onClose }) {
  if (!open) return null;
  const side = placement === 'left' ? 'left-0' : 'right-0';
  return (
    <div className="fixed inset-0 z-[9999] bg-black/40">
      <div className={cn('absolute top-0 flex h-full flex-col bg-white shadow-[0_8px_30px_rgba(0,0,0,0.16)]', side)} style={{ width }}>
        <div className="flex h-[56px] shrink-0 items-center justify-between border-b border-[#E5E6EB] px-[20px]">
          <div className="text-[16px] font-medium leading-[24px] text-[#020814]">{title}</div>
          <button className="flex h-[28px] w-[28px] items-center justify-center rounded-[4px] text-[#4E5969] hover:bg-[#F2F3F5]" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-auto p-[20px] text-[14px] leading-[22px] text-[#1D2129]">{children}</div>
        {footer && <div className="flex h-[64px] shrink-0 items-center justify-end gap-[12px] border-t border-[#E5E6EB] px-[20px]">{footer}</div>}
      </div>
    </div>
  );
}

export function DDPageHeader({
  action,
  auxiliary,
  children,
  className,
  title,
}) {
  return (
    <div className={cn('flex shrink-0 flex-col gap-[16px] bg-white px-[20px] pb-[16px] pt-[20px]', className)}>
      <div className="flex h-[24px] items-center justify-between">
        <h1 className="text-[16px] font-medium leading-[24px] tracking-[0.048px] text-[#020814]">{title}</h1>
        {action}
      </div>
      <div className="flex min-h-[32px] flex-wrap items-start justify-between gap-[12px]">
        <div className="flex flex-wrap items-start gap-[16px]">{children}</div>
        {auxiliary && <div className="flex items-center gap-[12px]">{auxiliary}</div>}
      </div>
    </div>
  );
}
