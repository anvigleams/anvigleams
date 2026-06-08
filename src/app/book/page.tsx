'use client';

import { useState, useEffect, useRef } from 'react';
import { Sparkles, CheckCircle, Copy, Calendar, Clock, Info, ChevronDown } from 'lucide-react';
import { createAppointment, getBookedTimeSlots } from '@/services/appointmentService';
import { TREATMENTS, TIME_SLOTS } from '@/lib/data';
import type { BookingFormData } from '@/types';
import { useTranslation } from '@/lib/i18n';

const INITIAL: BookingFormData = { name: '', phone: '', treatment: '', date: '', time: '', notes: '' };

function timeLabel(t: string) {
  const [h, m] = t.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  return `${h > 12 ? h - 12 : h === 0 ? 12 : h}:${m.toString().padStart(2, '0')} ${ampm}`;
}

function formatDate(dateStr: string) {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr.includes('T') ? dateStr : dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch { return dateStr; }
}

const YEARS = [{ value: new Date().getFullYear().toString(), label: new Date().getFullYear().toString() }, { value: (new Date().getFullYear() + 1).toString(), label: (new Date().getFullYear() + 1).toString() }];

const getDayOptions = (month: string, year: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let maxDays = 31;
  if (month && year) {
    const mNum = new Date(Date.parse(`${month} 1, 2012`)).getMonth();
    maxDays = new Date(Number(year), mNum + 1, 0).getDate();
  }
  
  return Array.from({length: maxDays}, (_, i) => {
    const dayStr = String(i+1);
    let disabled = false;
    if (month && year) {
      const mNum = new Date(Date.parse(`${month} 1, 2012`)).getMonth() + 1;
      const d = new Date(`${year}-${mNum.toString().padStart(2, '0')}-${dayStr.padStart(2, '0')}T00:00:00`);
      if (d <= today) disabled = true;
    }
    return { value: dayStr, label: dayStr, disabled };
  });
};

const getMonthOptions = (year: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => {
    let disabled = false;
    if (year) {
      const d = new Date(Number(year), i + 1, 0, 0, 0, 0);
      if (d < today) disabled = true;
    }
    return { value: m, label: m, disabled };
  });
};

const getTreatmentOptions = (t: any) => [
  ...TREATMENTS.map(trt => ({ value: trt.name, label: t(`treatment.${trt.slug.replace(/-/g, '_')}`) || trt.name })),
  { value: 'Other', label: t('misc.other') }
];

// Custom Dropdown Component
function CustomDropdown({ value, onChange, options, placeholder, icon: Icon, disabled = false }: any) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const selectedLabel = options.find((o: any) => o.value === value)?.label;

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%', opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? 'none' : 'auto' }}>
      <button 
        type="button"
        onClick={() => setOpen(!open)}
        className="form-input"
        style={{ 
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
          paddingLeft: Icon ? 40 : 16, background: '#fff', textAlign: 'left'
        }}
      >
        {Icon && <Icon size={15} style={{ position: 'absolute', left: 14, color: 'var(--text-muted)' }} />}
        <span style={{ color: value ? 'var(--text-primary)' : 'var(--text-muted)' }}>
          {selectedLabel || placeholder}
        </span>
        <ChevronDown size={15} style={{ color: 'var(--text-muted)', transform: open ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
      </button>
      
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4,
          background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--r-md)',
          boxShadow: 'var(--shadow-md)', zIndex: 50, maxHeight: 220, overflowY: 'auto'
        }}>
          {options.map((opt: any) => (
            <div 
              key={opt.value}
              onClick={() => { if (!opt.disabled) { onChange(opt.value); setOpen(false); } }}
              style={{
                padding: '10px 16px', cursor: opt.disabled ? 'not-allowed' : 'pointer', fontFamily: 'var(--sans)', fontSize: '0.9rem',
                background: value === opt.value ? 'var(--crimson-light)' : 'transparent',
                color: opt.disabled ? 'var(--text-muted)' : value === opt.value ? 'var(--crimson)' : 'var(--text-primary)',
                opacity: opt.disabled ? 0.4 : 1,
                textDecoration: opt.disabled ? 'line-through' : 'none'
              }}
              onMouseEnter={(e) => {
                if (!opt.disabled && value !== opt.value) e.currentTarget.style.background = 'var(--bg-soft)';
              }}
              onMouseLeave={(e) => {
                if (!opt.disabled && value !== opt.value) e.currentTarget.style.background = 'transparent';
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


export default function BookPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState<BookingFormData>(INITIAL);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const [loading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [fetchingSlots, setFetchingSlots] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const monthOpts = getMonthOptions(year).map(m => ({ ...m, label: t(`month.${m.value}`) }));
  const dayOpts = getDayOptions(month, year);
  const treatmentOpts = getTreatmentOptions(t);

  // If selected month becomes disabled, clear it
  useEffect(() => {
    if (month && year) {
      const isMonthDisabled = getMonthOptions(year).find(m => m.value === month)?.disabled;
      if (isMonthDisabled) setMonth('');
    }
  }, [year, month]);

  // If selected day becomes disabled or out of bounds, clear it
  useEffect(() => {
    if (day && month && year) {
      const isDayDisabled = getDayOptions(month, year).find(d => d.value === day)?.disabled;
      const isOutOfBounds = Number(day) > getDayOptions(month, year).length;
      if (isDayDisabled || isOutOfBounds) setDay('');
    }
  }, [month, year, day]);

  // Combine day, month, year into YYYY-MM-DD
  useEffect(() => {
    if (day && month && year) {
      const monthNum = new Date(Date.parse(`${month} 1, 2012`)).getMonth() + 1;
      const formattedMonth = monthNum.toString().padStart(2, '0');
      const formattedDay = day.padStart(2, '0');
      setForm(p => ({ ...p, date: `${year}-${formattedMonth}-${formattedDay}` }));
    } else {
      setForm(p => ({ ...p, date: '' }));
    }
  }, [day, month, year]);

  useEffect(() => {
    if (!form.date) {
      setBookedSlots([]);
      return;
    }
    let isMounted = true;
    setFetchingSlots(true);
    getBookedTimeSlots(form.date)
      .then((slots) => {
        if (isMounted) setBookedSlots(slots);
      })
      .catch(console.error)
      .finally(() => {
        if (isMounted) setFetchingSlots(false);
      });
    return () => { isMounted = false; };
  }, [form.date]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError('');
  };

  const handlePreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return setError(t('error.name'));
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''))) return setError(t('error.phone'));
    if (!form.treatment) return setError(t('error.treatment'));
    if (!form.date) return setError(t('error.date'));
    
    // Check if selected date is in the past
    const selectedDate = new Date(form.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate <= today) return setError(t('error.past_date'));

    if (!form.time) return setError(t('error.time'));
    
    setShowConfirm(true);
  };

  const executeSubmit = async () => {
    setShowConfirm(false);
    setLoading(true);
    try {
      const id = await createAppointment(form);
      setBookingId(id);
      setForm(INITIAL);
      setDay(''); setMonth(''); setYear('');
    } catch (err) {
      console.error(err);
      setError(t('error.general'));
    } finally {
      setLoading(false);
    }
  };

  // ── Success screen ────────────────────────────────────
  if (bookingId) {
    return (
      <div style={{ background: 'var(--bg)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', padding: '52px 44px', maxWidth: 460, width: '100%', textAlign: 'center', boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--crimson-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <CheckCircle size={32} color="var(--crimson)" />
          </div>
          <h2 className="display" style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: 8 }}>{t('book.success')}</h2>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: 28, lineHeight: 1.65 }}>
            {t('book.success_desc')}
          </p>

          <div style={{ background: 'var(--bg-soft)', border: '1.5px dashed var(--border)', borderRadius: 'var(--r-md)', padding: '20px', marginBottom: 28 }}>
            <p className="label" style={{ marginBottom: 6 }}>{t('book.booking_id')}</p>
            <div className="display" style={{ fontSize: '2rem', color: 'var(--crimson)', letterSpacing: '0.08em', marginBottom: 12 }}>
              {bookingId}
            </div>
            <button
              onClick={() => { navigator.clipboard.writeText(bookingId); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
              className="btn btn-ghost"
              style={{ fontSize: '0.78rem', padding: '7px 14px' }}
            >
              <Copy size={12} />
              {copied ? t('book.copied') : t('book.copy')}
            </button>
          </div>

          <div style={{ background: 'var(--bg-soft)', border: '1px solid var(--border-light)', borderRadius: 'var(--r-md)', padding: '13px 16px', marginBottom: 28, textAlign: 'left' }}>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, display: 'flex', gap: 8 }}>
              <Info size={14} style={{ color: 'var(--rose)', flexShrink: 0, marginTop: 1 }} />
              {t('book.track_instruction')}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <a href="/track" className="btn btn-primary" style={{ justifyContent: 'center' }}>{t('book.track_btn')}</a>
            <button onClick={() => setBookingId(null)} className="btn btn-outline" style={{ justifyContent: 'center' }}>
              {t('book.book_another')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Form ──────────────────────────────────────────────
  return (
    <>
      <div style={{ background: 'var(--bg-soft)', borderBottom: '1px solid var(--border-light)', padding: '56px 24px 40px' }}>
        <div className="container">
          <span className="label">{t('book.subtitle')}</span>
          <h1 className="display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: 'var(--text-primary)', marginTop: 8 }}>
            {t('book.title')}
          </h1>
        </div>
      </div>

      <div style={{ background: 'var(--bg)', padding: '56px 24px 80px' }}>
        <div style={{ maxWidth: 660, margin: '0 auto' }}>
          <form onSubmit={handlePreSubmit} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', padding: '44px 40px', boxShadow: 'var(--shadow-sm)' }}>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 18 }}>
              <div>
                <label className="form-label" htmlFor="book-name">{t('book.name')}</label>
                <input id="book-name" name="name" type="text" placeholder={t('book.placeholder_name')} value={form.name} onChange={handleChange} className="form-input" />
              </div>
              <div>
                <label className="form-label" htmlFor="book-phone">{t('book.phone')}</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <span style={{ position: 'absolute', left: 16, fontFamily: 'var(--sans)', fontSize: '0.93rem', color: 'var(--text-secondary)' }}>+91</span>
                  <input id="book-phone" name="phone" type="tel" placeholder={t('book.placeholder_phone')} value={form.phone} onChange={handleChange} className="form-input" style={{ paddingLeft: 46 }} />
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 18 }}>
              <label className="form-label" htmlFor="book-treatment">{t('book.treatment')}</label>
              <CustomDropdown 
                value={form.treatment} 
                onChange={(val: string) => setForm(p => ({ ...p, treatment: val }))} 
                options={treatmentOpts} 
                placeholder={t('book.placeholder_treatment')} 
                icon={Sparkles} 
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label className="form-label">{t('book.date')}</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                <CustomDropdown value={year} onChange={setYear} options={YEARS} placeholder={t('misc.year')} />
                <CustomDropdown value={month} onChange={setMonth} options={monthOpts} placeholder={t('misc.month')} disabled={!year} />
                <CustomDropdown value={day} onChange={setDay} options={dayOpts} placeholder={t('misc.day')} disabled={!month || !year} />
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{t('book.time')}</span>
                {fetchingSlots && <span style={{ color: 'var(--crimson)', fontSize: '0.7rem' }}>{t('book.checking')}</span>}
              </label>
              
              {!form.date ? (
                <div style={{ padding: '24px', textAlign: 'center', background: 'var(--bg-soft)', border: '1px dashed var(--border)', borderRadius: 'var(--r-md)' }}>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {t('book.select_date_first')}
                  </p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: 10 }}>
                  {TIME_SLOTS.map(t => {
                    const isBooked = bookedSlots.includes(t);
                    const isSelected = form.time === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        disabled={isBooked || fetchingSlots}
                        onClick={() => {
                          setForm(p => ({ ...p, time: t }));
                          setError('');
                        }}
                        style={{
                          padding: '10px 4px', borderRadius: 'var(--r-sm)', border: '1.5px solid',
                          borderColor: isSelected ? 'var(--crimson)' : 'var(--border)',
                          background: isSelected ? 'var(--crimson)' : '#fff',
                          color: isSelected ? '#fff' : isBooked ? 'var(--text-muted)' : 'var(--text-primary)',
                          opacity: isBooked ? 0.3 : fetchingSlots ? 0.6 : 1,
                          cursor: isBooked || fetchingSlots ? 'not-allowed' : 'pointer',
                          fontFamily: 'var(--sans)', fontSize: '0.85rem', fontWeight: 500,
                          transition: 'all 0.2s', textDecoration: isBooked ? 'line-through' : 'none'
                        }}
                      >
                        {timeLabel(t)}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div style={{ marginBottom: 28 }}>
              <label className="form-label" htmlFor="book-notes">{t('book.notes')}</label>
              <textarea id="book-notes" name="notes" rows={3} placeholder={t('book.placeholder_notes')} value={form.notes} onChange={handleChange} className="form-input" style={{ resize: 'vertical', minHeight: 80 }} />
            </div>

            {error && (
              <div style={{ background: 'var(--crimson-light)', border: '1px solid rgba(196,30,58,0.2)', borderRadius: 'var(--r-md)', padding: '11px 15px', marginBottom: 18, fontFamily: 'var(--sans)', fontSize: '0.85rem', color: 'var(--crimson)' }}>
                ⚠️ {error}
              </div>
            )}

            <div style={{ background: 'var(--bg-soft)', border: '1px solid var(--border-light)', borderRadius: 'var(--r-md)', padding: '12px 16px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Info size={14} style={{ color: 'var(--rose)', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--sans)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                {t('book.no_login')}
              </span>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}
              style={{ width: '100%', justifyContent: 'center', padding: '15px', fontSize: '0.92rem', opacity: loading ? 0.7 : 1 }}>
              {loading ? (
                <>
                  <div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  {t('book.submitting')}
                </>
              ) : (
                <><Sparkles size={17} /> {t('book.confirm')}</>
              )}
            </button>
          </form>
        </div>
      </div>

      {showConfirm && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, backdropFilter: 'blur(4px)' }}>
          <div style={{ background: '#fff', padding: 32, borderRadius: 'var(--r-xl)', maxWidth: 400, width: '100%', boxShadow: 'var(--shadow-lg)' }} className="anim-fade-up">
            <h3 className="display" style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: 12 }}>{t('book.confirm_title')}</h3>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: 24, lineHeight: 1.6 }}>
              {t('book.confirm_desc1')} <strong>{form.treatment}</strong> {t('book.confirm_desc2')} <strong style={{ color: 'var(--crimson)' }}>{formatDate(form.date)}</strong> {t('book.confirm_desc3')} <strong style={{ color: 'var(--crimson)' }}>{timeLabel(form.time)}</strong>.<br/><br/>
              {t('book.confirm_desc4')}
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setShowConfirm(false)} className="btn btn-ghost" style={{ flex: 1, padding: '12px' }}>{t('book.cancel')}</button>
              <button onClick={executeSubmit} className="btn btn-primary" style={{ flex: 1, padding: '12px' }}>{t('book.yes_confirm')}</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 600px) {
          form div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          form { padding: 28px 22px !important; }
        }
      `}</style>
    </>
  );
}
