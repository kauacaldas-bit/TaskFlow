import { useState, useRef, useEffect } from 'react';
import styles from './CustomSelect.module.css';

export default function CustomSelect({ options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className={styles.container} ref={dropdownRef}>
      <div 
        className={`${styles.selected} ${isOpen ? styles.open : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? selectedOption.label : 'Selecione'}
        <svg 
          className={styles.arrow} 
          width="12" height="12" viewBox="0 0 24 24" 
          fill="none" stroke="currentColor" strokeWidth="2" 
          strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
      {isOpen && (
        <ul className={styles.optionsList}>
          {options.map(opt => (
            <li 
              key={opt.value} 
              className={`${styles.optionItem} ${opt.value === value ? styles.active : ''}`}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
