import React, { useState, useEffect } from 'react';
import './css/DoctorPatientPortal.css';

interface DoctorPatientPortalProps {
  onBack?: () => void;
 
}

const DoctorPatientPortal: React.FC<DoctorPatientPortalProps> = ({ onBack }) => {
  const mailApiUrl = 'http://localhost:8081/api/mail/send';

  // Configuration state
  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const [doctorName, setDoctorName] = useState<string>('');
  const [doctorGmail, setDoctorGmail] = useState<string>('');
  const [appPassword, setAppPassword] = useState<string>('');

  // Patient form state
  const [patientName, setPatientName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [medicineList, setMedicineList] = useState<string>('');
  const [patientEmail, setPatientEmail] = useState<string>('');
  const [appointmentDate, setAppointmentDate] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [sendStatus, setSendStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [backendResponse, setBackendResponse] = useState<string>('');

  // Load configuration from localStorage on mount
  useEffect(() => {
    const storedConfig = localStorage.getItem('doctorConfig');
    if (storedConfig) {
      const config = JSON.parse(storedConfig);
      if (config.configured) {
        setIsConfigured(true);
        setDoctorName(config.doctorName || '');
        setDoctorGmail(config.doctorGmail || '');
        setAppPassword(config.appPassword || '');
      }
    }
  }, []);

  const openAppPasswordGuide = () => {
    window.open('/app-password-guide.html', '_blank', 'noopener,noreferrer');
  };

  const formatBackendResponse = (responseBody: unknown): string => {
    if (responseBody === null || responseBody === undefined) return '';
    if (typeof responseBody === 'string') return responseBody;

    try {
      return JSON.stringify(responseBody, null, 2);
    } catch {
      return 'Response received successfully.';
    }
  };

  // Handle config submission
  const handleConfigSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctorName.trim() || !doctorGmail.trim() || !appPassword.trim()) {
      alert('Please enter doctor name, Gmail address, and App Password.');
      return;
    }
    // Basic Gmail validation (simple)
    if (!doctorGmail.includes('@') || !doctorGmail.includes('.')) {
      alert('Please enter a valid email address (e.g., name@gmail.com).');
      return;
    }
    const config = {
      configured: true,
      doctorName: doctorName.trim(),
      doctorGmail: doctorGmail.trim(),
      appPassword: appPassword.trim(),
    };
    localStorage.setItem('doctorConfig', JSON.stringify(config));
    setSendStatus('idle');
    setBackendResponse('');
    setIsConfigured(true);
  };

  // Reset configuration (for demo/change doctor)
  const handleResetConfig = () => {
    localStorage.removeItem('doctorConfig');
    setIsConfigured(false);
    setDoctorName('');
    setDoctorGmail('');
    setAppPassword('');
    // Clear patient form fields (optional)
    setPatientName('');
    setAge('');
    setDescription('');
    setMedicineList('');
    setPatientEmail('');
    setAppointmentDate('');
    setSendStatus('idle');
    setBackendResponse('');
  };

  // Handle patient data submission
  const handleSendPatientData = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validations
    if (!patientName.trim()) {
      alert('Please enter patient name.');
      return;
    }
    if (!age.trim() || isNaN(Number(age))) {
      alert('Please enter a valid age (number).');
      return;
    }
    if (!description.trim()) {
      alert('Please enter a description / symptoms.');
      return;
    }
    if (!medicineList.trim()) {
      alert('Please enter medicine list.');
      return;
    }
    if (!patientEmail.trim() || !patientEmail.includes('@')) {
      alert('Please enter a valid patient email.');
      return;
    }
    if (!appointmentDate) {
      alert('Please select a date.');
      return;
    }
    if (!doctorGmail.trim() || !appPassword.trim()) {
      alert('Doctor Gmail and App Password are required in configuration.');
      return;
    }

    const requestPayload = {
      fromEmail: doctorGmail.trim(),
      appPassword: appPassword.trim(),
      patientEmail: patientEmail.trim(),
      doctorName: doctorName.trim(),
      patientName: patientName.trim(),
      age: parseInt(age, 10),
      description: description.trim(),
      medicine_list: medicineList.trim(),
      date: appointmentDate,
    };

    setIsSending(true);
    setSendStatus('idle');
    setBackendResponse('');

    try {
      const response = await fetch(mailApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload),
      });

      const rawText = await response.text();
      let parsedBody: unknown = rawText;

      if (rawText) {
        try {
          parsedBody = JSON.parse(rawText);
        } catch {
          parsedBody = rawText;
        }
      }

      if (!response.ok) {
        const errorText = formatBackendResponse(parsedBody) || `Request failed with status ${response.status}.`;
        setSendStatus('error');
        setBackendResponse(errorText);
        return;
      }

      setSendStatus('success');
      setBackendResponse(formatBackendResponse(parsedBody) || 'Email sent successfully.');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unable to connect to mail service.';
      setSendStatus('error');
      setBackendResponse(errorMessage);
    } finally {
      setIsSending(false);
    }
  };

  // Configuration screen
  if (!isConfigured) {
    return (
      <div className="doctor-portal-page">
        <div className="doctor-portal-card">
          {onBack && (
            <button
              onClick={onBack}
              className="doctor-portal-back-btn"
              title="Go back"
            >
              ← Back
            </button>
          )}
          <h2 className="doctor-portal-heading">🏥 Hello Doctor</h2>
          <p className="doctor-portal-subheading">Configure your environment to start</p>

          <form className="doctor-portal-form" onSubmit={handleConfigSubmit}>
            <div className="doctor-portal-group">
              <label className="doctor-portal-label">📧 Gmail address</label>
              <input
                type="email"
                className="doctor-portal-input"
                placeholder="doctor.name@gmail.com"
                value={doctorGmail}
                onChange={(e) => setDoctorGmail(e.target.value)}
                required
              />
            </div>

            <div className="doctor-portal-group">
              <label className="doctor-portal-label">👨‍⚕️ Doctor's full name</label>
              <input
                type="text"
                className="doctor-portal-input"
                placeholder="e.g., Dr. Sarah Johnson"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                required
              />
            </div>

            <div className="doctor-portal-group">
              <div className="doctor-portal-help-row">
                <label className="doctor-portal-label">🔐 App Password</label>
                <button type="button" className="doctor-portal-help-btn" onClick={openAppPasswordGuide}>
                  How to get app password
                </button>
              </div>
              <input
                type="password"
                className="doctor-portal-input"
                placeholder="Enter your Gmail app password"
                value={appPassword}
                onChange={(e) => setAppPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="doctor-portal-primary-btn">
              🔧 Config Environment
            </button>
          </form>
          <div className="doctor-portal-footer-note">
            ⚡ One‑time setup • Data saved locally
          </div>
        </div>
      </div>
    );
  }

  // Patient form screen (doctor already configured)
  return (
    <div className="doctor-portal-page">
      <div className="doctor-portal-card">
        {onBack && (
          <button
            onClick={onBack}
            className="doctor-portal-back-btn"
            title="Go back"
          >
            ← Back
          </button>
        )}
        <div className="doctor-portal-topbar">
          <h2 className="doctor-portal-heading">📋 Patient Panel</h2>
          <button
            className="doctor-portal-reset-btn"
            onClick={handleResetConfig}
          >
            🔄 Change Doctor
          </button>
        </div>

        {/* Doctor info badge */}
        <div className="doctor-portal-badge">
          ✅ Configured as: <strong>{doctorName}</strong> · {doctorGmail}
        </div>

        <form className="doctor-portal-form" onSubmit={handleSendPatientData}>
          {/* Patient Full Name */}
          <div className="doctor-portal-group">
            <label className="doctor-portal-label">🧑 Patient full name</label>
            <input
              type="text"
              className="doctor-portal-input"
              placeholder="Enter patient's full name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
            />
          </div>

          {/* Age & Email in responsive grid */}
          <div className="doctor-portal-grid">
            <div className="doctor-portal-group">
              <label className="doctor-portal-label">🎂 Age (years)</label>
              <input
                type="number"
                className="doctor-portal-input"
                placeholder="e.g., 34"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
            <div className="doctor-portal-group">
              <label className="doctor-portal-label">📧 Patient email</label>
              <input
                type="email"
                className="doctor-portal-input"
                placeholder="patient@example.com"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Description / Symptoms */}
          <div className="doctor-portal-group">
            <label className="doctor-portal-label">📝 Description / Symptoms</label>
            <textarea
              className="doctor-portal-textarea"
              placeholder="Describe symptoms, medical history, reason for visit..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Medicine List (flexible input) */}
          <div className="doctor-portal-group">
            <label className="doctor-portal-label">💊 Medicine list</label>
            <textarea
              className="doctor-portal-textarea"
              placeholder="e.g., Ibuprofen 200mg (twice daily), Amoxicillin 500mg, Paracetamol 1g"
              value={medicineList}
              onChange={(e) => setMedicineList(e.target.value)}
              required
            />
          </div>

          {/* Date picker */}
          <div className="doctor-portal-group">
            <label className="doctor-portal-label">📅 Appointment / Prescription Date</label>
            <input
              type="date"
              className="doctor-portal-input"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="doctor-portal-primary-btn" disabled={isSending}>
            {isSending ? 'Sending...' : '✉️ Send Patient Data'}
          </button>

          {sendStatus !== 'idle' && (
            <div
              className={`doctor-portal-response ${
                sendStatus === 'success' ? 'doctor-portal-response-success' : 'doctor-portal-response-error'
              }`}
            >
              <strong>{sendStatus === 'success' ? 'Server Response:' : 'Send Failed:'}</strong>
              <pre>{backendResponse}</pre>
            </div>
          )}
        </form>

        <div className="doctor-portal-footer-note">
          🧾 All data stays on your device • Protected health info is handled locally
        </div>
      </div>
    </div>
  );
};

export default DoctorPatientPortal;