'use client';

import { useState } from 'react';
import { Search, Calendar, Clock, CheckCircle, XCircle, AlertCircle, Ban, X, Info } from 'lucide-react';
import { getAppointmentsByPhone, getTrackingResultsById, cancelAppointment } from '@/services/appointmentService';
import type { TrackingResult, AppointmentStatus } from '@/types';
import { STATUS_CONFIG } from '@/types';
import { useTranslation } from '@/lib/i18n';

function formatDate(dateStr: string) {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr.includes('T') ? dateStr : dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch { return dateStr; }
}

function formatTime(t: string) {
  if (!t) return '—';
  const [h, m] = t.split(':').map(Number);
  return `${h > 12 ? h - 12 : h === 0 ? 12 : h}:${m.toString().padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
}

const STATUS_ICON: Record<AppointmentStatus, React.ReactNode> = {
  pending: <AlertCircle size={13} />,
  accepted: <CheckCircle size={13} />,
  rejected: <XCircle size={13} />,
  completed: <CheckCircle size={13} />,
  missed: <Ban size={13} />,
  cancelled: <X size={13} />,
};

const STATUS_COLORS: Record<AppointmentStatus, { bg: string; text: string; border: string }> = {
  pending:   { bg: '#FFF8E7', text: '#92600A', border: '#F6D860' },
  accepted:  { bg: '#ECFDF5', text: '#065F46', border: '#6EE7B7' },
  rejected:  { bg: '#FEF2F2', text: '#991B1B', border: '#FCA5A5' },
  completed: { bg: '#EFF6FF', text: '#1E40AF', border: '#93C5FD' },
  missed:    { bg: '#F9FAFB', text: '#374151', border: '#D1D5DB' },
  cancelled: { bg: '#FFF1F2', text: '#9F1239', border: '#FDA4AF' },
};

export default function TrackPage() {
  const { t } = useTranslation();
  const [phone, setPhone] = useState('');
  const [trackMode, setTrackMode] = useState<'phone' | 'id'>('phone');
  const [idChars, setIdChars] = useState<string[]>(Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<TrackingResult[] | null>(null);
  const [error, setError] = useState('');
  const [cancelLoading, setCancelLoading] = useState<string | null>(null);
  const [cancelMsg, setCancelMsg] = useState('');
  const [cancelModalId, setCancelModalId] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setResults(null); setCancelMsg(''); setLoading(true);
    try {
      if (trackMode === 'phone') {
        if (!/^[6-9]\d{9}$/.test(phone.replace(/\s/g, ''))) {
          setError(t('error.phone'));
          setLoading(false);
          return;
        }
        setResults(await getAppointmentsByPhone(phone));
      } else {
        const fullId = idChars.join('');
        if (fullId.length !== 6) {
          setError('Please enter the complete 6-character booking ID.');
          setLoading(false);
          return;
        }
        setResults(await getTrackingResultsById(`AG-${fullId}`));
      }
    }
    catch (err) { 
      console.error('Firestore Error:', err);
      setError(t('error.general')); 
    }
    finally { setLoading(false); }
  };

  const handleIdChange = (index: number, value: string) => {
    const newVal = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (newVal.length > 1) {
      // Handle paste
      const pasted = newVal.slice(0, 6);
      const newChars = [...idChars];
      for (let i = 0; i < pasted.length; i++) {
        if (index + i < 6) newChars[index + i] = pasted[i];
      }
      setIdChars(newChars);
      const nextIndex = Math.min(index + pasted.length, 5);
      document.getElementById(`id-input-${nextIndex}`)?.focus();
      return;
    }

    const newChars = [...idChars];
    newChars[index] = newVal;
    setIdChars(newChars);

    // Auto-advance
    if (newVal && index < 5) {
      document.getElementById(`id-input-${index + 1}`)?.focus();
    }
  };

  const handleIdKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !idChars[index] && index > 0) {
      document.getElementById(`id-input-${index - 1}`)?.focus();
    }
  };

  const handleCancelRequest = (appointmentId: string) => {
    setCancelModalId(appointmentId);
  };

  const executeCancel = async () => {
    if (!cancelModalId) return;
    const appointmentId = cancelModalId;
    setCancelModalId(null);
    setCancelLoading(appointmentId); setCancelMsg('');
    try {
      await cancelAppointment(appointmentId);
      setCancelMsg('✓ Appointment cancelled successfully.');
      setResults(await getAppointmentsByPhone(phone));
    } catch (err: unknown) {
      console.error('Cancel Error:', err);
      setCancelMsg((err instanceof Error ? err.message : 'Failed to cancel. Please call us.'));
    } finally { setCancelLoading(null); }
  };

  const grouped = results ? {
    upcoming:  results.filter((r) => ['pending','accepted'].includes(r.appointment.status)),
    completed: results.filter((r) => r.appointment.status === 'completed'),
    other:     results.filter((r) => ['cancelled','rejected','missed'].includes(r.appointment.status)),
  } : null;

  return (
    <>
      <div style={{ background: 'var(--bg-soft)', borderBottom: '1px solid var(--border-light)', padding: '56px 24px 40px' }}>
        <div className="container">
          <span className="label">{t('track.subtitle')}</span>
          <h1 className="display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: 'var(--text-primary)', marginTop: 8 }}>
            {t('track.title')}
          </h1>
        </div>
      </div>

      <div style={{ background: 'var(--bg)', padding: '56px 24px 80px' }}>
        <div className="container">
          <p style={{ fontFamily: 'var(--sans)', fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: 480, marginBottom: 32 }}>
            {t('track.desc')}
          </p>

          {/* Search */}
          <div style={{ maxWidth: 480, marginBottom: 40 }}>
            {/* Mode Switcher */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
              <button
                onClick={() => { setTrackMode('phone'); setError(''); setResults(null); }}
                className={`btn ${trackMode === 'phone' ? 'btn-primary' : 'btn-outline'}`}
                style={{ flex: 1, padding: '8px', fontSize: '0.85rem' }}
              >
                Track by Phone
              </button>
              <button
                onClick={() => { setTrackMode('id'); setError(''); setResults(null); }}
                className={`btn ${trackMode === 'id' ? 'btn-primary' : 'btn-outline'}`}
                style={{ flex: 1, padding: '8px', fontSize: '0.85rem' }}
              >
                Track by Booking ID
              </button>
            </div>

            <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {trackMode === 'phone' ? (
                <div style={{ display: 'flex', gap: 10 }}>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                    <span style={{ position: 'absolute', left: 38, top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--sans)', fontSize: '0.93rem', color: 'var(--text-secondary)', pointerEvents: 'none' }}>+91</span>
                    <input
                      id="track-phone" type="tel" placeholder={t('book.placeholder_phone')}
                      value={phone} onChange={(e) => { setPhone(e.target.value); setError(''); }}
                      className="form-input" style={{ paddingLeft: 72 }}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={loading} style={{ padding: '12px 20px', flexShrink: 0 }}>
                    {loading ? '...' : <Search size={17} />}
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-secondary)' }}>AG-</div>
                  <div style={{ display: 'flex', gap: 8, flex: 1 }}>
                    {idChars.map((char, idx) => (
                      <input
                        key={idx}
                        id={`id-input-${idx}`}
                        type="text"
                        value={char}
                        maxLength={6} // allow paste
                        onChange={(e) => handleIdChange(idx, e.target.value)}
                        onKeyDown={(e) => handleIdKeyDown(idx, e)}
                        className="form-input"
                        style={{
                          flex: 1,
                          padding: '12px 0',
                          textAlign: 'center',
                          fontSize: '1.2rem',
                          textTransform: 'uppercase',
                          fontWeight: 600,
                          minWidth: 0,
                        }}
                      />
                    ))}
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={loading || idChars.join('').length !== 6} style={{ padding: '12px 20px', flexShrink: 0 }}>
                    {loading ? '...' : <Search size={17} />}
                  </button>
                </div>
              )}
            </form>

            {error && <p style={{ fontFamily: 'var(--sans)', fontSize: '0.84rem', color: 'var(--crimson)', marginTop: 10 }}>⚠️ {error}</p>}
            {cancelMsg && (
              <div style={{ marginTop: 12, padding: '11px 14px', background: cancelMsg.startsWith('✓') ? '#ECFDF5' : 'var(--crimson-light)', border: `1px solid ${cancelMsg.startsWith('✓') ? '#6EE7B7' : 'rgba(196,30,58,0.2)'}`, borderRadius: 'var(--r-md)', fontFamily: 'var(--sans)', fontSize: '0.84rem', color: cancelMsg.startsWith('✓') ? '#065F46' : 'var(--crimson)' }}>
                {cancelMsg}
              </div>
            )}
          </div>

          {/* Results */}
          {results !== null && (
            results.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>📭</div>
                <h3 className="display" style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: 8 }}>{t('track.no_appointments')}</h3>
                <p style={{ fontFamily: 'var(--sans)', color: 'var(--text-secondary)' }}>
                  {t('track.no_appointments_desc')}{' '}
                  <a href="/book" style={{ color: 'var(--crimson)', fontWeight: 600 }}>{t('track.book_one_now')}</a>
                </p>
              </div>
            ) : (
              <div style={{ maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 40 }}>
                {grouped!.upcoming.length > 0 && <Group title={t('track.upcoming')} items={grouped!.upcoming} onCancel={handleCancelRequest} cancelLoading={cancelLoading} t={t} />}
                {grouped!.completed.length > 0 && <Group title={t('track.completed')} items={grouped!.completed} onCancel={null} cancelLoading={null} t={t} />}
                {grouped!.other.length > 0 && <Group title={t('track.other')} items={grouped!.other} onCancel={null} cancelLoading={null} t={t} />}
              </div>
            )
          )}
        </div>
      </div>

      {cancelModalId && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, backdropFilter: 'blur(4px)' }}>
          <div style={{ background: '#fff', padding: 32, borderRadius: 'var(--r-xl)', maxWidth: 400, width: '100%', boxShadow: 'var(--shadow-lg)' }} className="anim-fade-up">
            <h3 className="display" style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: 12 }}>{t('track.cancel_modal_title')}</h3>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: 24, lineHeight: 1.6 }}>
              {t('track.cancel_modal_desc')}
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setCancelModalId(null)} className="btn btn-ghost" style={{ flex: 1, padding: '12px' }}>{t('track.no_keep')}</button>
              <button onClick={executeCancel} className="btn btn-primary" style={{ flex: 1, padding: '12px', background: 'var(--crimson)' }}>{t('track.yes_cancel')}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Group({ title, items, onCancel, cancelLoading, t }: {
  title: string;
  items: TrackingResult[];
  onCancel: ((id: string) => void) | null;
  cancelLoading: string | null;
  t: (key: string) => string;
}) {
  return (
    <div>
      <h2 className="display" style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: 14 }}>{title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {items.map(({ appointment: a, payment: p }) => {
          const sc = STATUS_COLORS[a.status];
          const canCancel = a.status === 'pending' && onCancel;
          return (
            <div key={a.appointmentId} style={{ background: '#fff', border: '1px solid var(--border-light)', borderRadius: 'var(--r-lg)', padding: '22px 24px', boxShadow: 'var(--shadow-xs)' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 14 }}>
                <div>
                  <div className="display" style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>{t(`treatment.${a.treatment.replace(/\s+/g, '_').toLowerCase()}`) || a.treatment}</div>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: 2 }}>ID: {a.appointmentId}</div>
                </div>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 12px', borderRadius: 'var(--r-full)', background: sc.bg, color: sc.text, border: `1px solid ${sc.border}`, fontFamily: 'var(--sans)', fontSize: '0.73rem', fontWeight: 600 }}>
                  {STATUS_ICON[a.status]} {STATUS_CONFIG[a.status].label}
                </span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Calendar size={13} color="var(--rose)" />
                  <span style={{ fontFamily: 'var(--sans)', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>{formatDate(a.date)}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Clock size={13} color="var(--rose)" />
                  <span style={{ fontFamily: 'var(--sans)', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>{formatTime(a.time)}</span>
                </div>
              </div>

              {/* Payment */}
              {a.status === 'completed' && p && (
                <div style={{ marginTop: 14, background: 'var(--bg-soft)', borderRadius: 'var(--r-md)', padding: '12px 16px', display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center', border: '1px solid var(--border-light)' }}>
                  <div>
                    <p className="label" style={{ marginBottom: 2, fontSize: '0.65rem' }}>{t('track.amount')}</p>
                    <span className="display" style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>₹{p.amount.toLocaleString('en-IN')}</span>
                  </div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 'var(--r-full)', background: p.paid ? '#ECFDF5' : '#FFF8E7', color: p.paid ? '#065F46' : '#92600A', border: `1px solid ${p.paid ? '#6EE7B7' : '#F6D860'}`, fontFamily: 'var(--sans)', fontSize: '0.75rem', fontWeight: 600 }}>
                    <CheckCircle size={12} />
                    {p.paid ? `✓ ${t('track.paid')}` : t('track.payment_pending')}
                  </span>
                </div>
              )}

              {/* Cancel */}
              {canCancel && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border-light)' }}>
                  <button onClick={() => onCancel(a.appointmentId)} disabled={cancelLoading === a.appointmentId}
                    className="btn btn-ghost"
                    style={{ fontSize: '0.8rem', padding: '8px 16px', color: 'var(--crimson)', borderColor: 'rgba(196,30,58,0.25)', opacity: cancelLoading === a.appointmentId ? 0.6 : 1 }}>
                    <X size={13} />
                    {cancelLoading === a.appointmentId ? t('track.cancelling') : t('track.cancel_btn')}
                  </button>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: '0.73rem', color: 'var(--text-muted)', marginTop: 7, display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Info size={11} style={{ flexShrink: 0 }} />
                    {t('track.cancel_info')}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
