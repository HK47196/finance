import React, { useState, useEffect, useRef } from 'react';
import Card from '../../components/Card';
import { useFinance } from '../../contexts/FinanceContext';
import { applyTheme, getPreferredTheme, setTheme } from '../../utils/themeUtils';
import './SettingsView.css';

function SettingsView() {
  const { exportData, importData } = useFinance();
  const [currentTheme, setCurrentTheme] = useState(getPreferredTheme());
  const fileInputRef = useRef(null);

  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setCurrentTheme(newTheme);
    setTheme(newTheme);
  };

  const handleExport = () => exportData();
  const handleImportClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        importData(data);
        alert('Data imported successfully');
      } catch {
        alert('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = null;
  };

  return (
    <div className="settings-view">
      <Card title="Appearance">
        <div className="setting-item">
          <label htmlFor="theme-select">Theme</label>
          <select id="theme-select" value={currentTheme} onChange={handleThemeChange}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
          <p className="setting-description">Choose app appearance.</p>
        </div>
      </Card>
      <Card title="Data Management">
        <div className="setting-item">
          <label>Export Data</label>
          <button onClick={handleExport}>Export JSON</button>
        </div>
        <div className="setting-item">
          <label>Import Data</label>
          <button onClick={handleImportClick}>Import JSON</button>
          <input type="file" ref={fileInputRef} accept=".json" onChange={handleFileChange} style={{ display: 'none' }} />
        </div>
      </Card>
      <Card title="About">
        <div className="about-section">
          <p><strong>Personal Finance Dashboard</strong></p>
        </div>
      </Card>
    </div>
  );
}

export default SettingsView;
