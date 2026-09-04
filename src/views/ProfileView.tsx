import React, { useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  Train, 
  Phone, 
  Plus, 
  Trash2, 
  Check, 
  MessageSquare, 
  Smartphone, 
  Send, 
  Sparkles, 
  Info, 
  ChevronRight, 
  ShieldAlert,
  RotateCcw,
  Compass
} from 'lucide-react';
import { DEFAULT_EMERGENCY_CONTACTS } from '../data/delhiData';
import { EmergencyContact } from '../types';

interface ProfileViewProps {
  onReplayOnboarding?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onReplayOnboarding }) => {
  const [contacts, setContacts] = useState<EmergencyContact[]>(DEFAULT_EMERGENCY_CONTACTS);
  const [enableWhatsApp, setEnableWhatsApp] = useState(true);
  const [enableSMS, setEnableSMS] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newRelation, setNewRelation] = useState('');

  const handleAddContact = () => {
    if (!newName || !newPhone) return;
    const newEntry: EmergencyContact = {
      id: `contact-${Date.now()}`,
      name: newName,
      relation: newRelation || 'Friend',
      phone: newPhone,
      initials: newName.slice(0, 2).toUpperCase(),
      isPrimary: false,
      notifyWhatsApp: true,
      notifySMS: true
    };
    setContacts([...contacts, newEntry]);
    setNewName('');
    setNewPhone('');
    setNewRelation('');
    setShowAddModal(false);
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-5 px-4 pb-28 pt-2">
      {/* Header with Headline alone, no subtitle text */}
      <div>
        <h1 className="text-[26px] font-bold text-[#4A2E3A] font-heading tracking-tight">
          Profile & Safety Circle
        </h1>
      </div>

      {/* User Card */}
      <div className="bg-[#FFFFFF] rounded-3xl p-5 flex items-center gap-4 shadow-xs">
        <div className="w-14 h-14 rounded-full bg-[#FBE4E8] text-[#4A2E3A] font-bold text-[18px] flex items-center justify-center border-2 border-[#FFFFFF] shadow-xs">
          JS
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-[17px] font-bold text-[#4A2E3A]">Jahnvi Sharma</h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FBE4E8] text-[#4A2E3A] font-bold">
              Verified
            </span>
          </div>
          <p className="text-[12px] text-[#8B7A82] mt-0.5">Hauz Khas, South Delhi • Member since 2025</p>
        </div>
      </div>

      {/* App Guide & Onboarding Replay */}
      {onReplayOnboarding && (
        <button
          onClick={onReplayOnboarding}
          className="w-full p-4 rounded-3xl bg-[#FBE4E8] hover:bg-[#F8D2D9] transition-all flex items-center justify-between text-left shadow-2xs group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFFFFF] flex items-center justify-center text-[#4A2E3A] shadow-2xs group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 text-[#E89C8B]" />
            </div>
            <div>
              <span className="text-[14px] font-bold text-[#4A2E3A] block font-heading">
                Replay App Intro & Onboarding
              </span>
              <span className="text-[11px] text-[#8B7A82] block">
                Discover, Day Planner & Come With Me guide
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#4A2E3A] group-hover:translate-x-0.5 transition-transform" />
        </button>
      )}

      {/* Emergency Broadcast Channels */}
      <div className="bg-[#FFFFFF] rounded-3xl p-5 space-y-3.5 shadow-xs">
        <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#8B7A82]">
          Default Alert Channels
        </h3>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => setEnableWhatsApp(!enableWhatsApp)}
            className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
              enableWhatsApp
                ? 'bg-[#EBF3EA] border-[#DFECE0] text-[#3F5D41]'
                : 'bg-[#FDF7F4] border-[#E5DFF2] text-[#8B7A82]'
            }`}
          >
            <div className="flex items-center gap-2 text-left">
              <MessageSquare className="w-4 h-4" />
              <div>
                <span className="text-[13px] font-bold block">WhatsApp</span>
                <span className="text-[10px] opacity-80 block">Instant message</span>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${enableWhatsApp ? 'bg-[#3F5D41] text-white' : 'border border-[#8B7A82]'}`}>
              {enableWhatsApp && <Check className="w-3 h-3" />}
            </div>
          </button>

          <button
            onClick={() => setEnableSMS(!enableSMS)}
            className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
              enableSMS
                ? 'bg-[#EBF3EA] border-[#DFECE0] text-[#3F5D41]'
                : 'bg-[#FDF7F4] border-[#E5DFF2] text-[#8B7A82]'
            }`}
          >
            <div className="flex items-center gap-2 text-left">
              <Smartphone className="w-4 h-4" />
              <div>
                <span className="text-[13px] font-bold block">Live SMS</span>
                <span className="text-[10px] opacity-80 block">Direct GPS link</span>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${enableSMS ? 'bg-[#3F5D41] text-white' : 'border border-[#8B7A82]'}`}>
              {enableSMS && <Check className="w-3 h-3" />}
            </div>
          </button>
        </div>
      </div>

      {/* Emergency Contacts Circle */}
      <div className="bg-[#FFFFFF] rounded-3xl p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[16px] font-bold text-[#4A2E3A]">Emergency Circle</h3>
            <span className="text-[12px] text-[#8B7A82]">Notified automatically upon deviation</span>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3 py-1.5 rounded-full bg-[#FBE4E8]/60 text-[12px] font-bold text-[#4A2E3A] hover:bg-[#FBE4E8] transition-colors flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>

        <div className="space-y-2.5">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="p-3 rounded-2xl bg-[#FDF7F4] flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FBE4E8] text-[#4A2E3A] font-bold text-[13px] flex items-center justify-center shrink-0">
                  {contact.initials}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[14px] font-bold text-[#4A2E3A]">{contact.name}</span>
                    {contact.isPrimary && (
                      <span className="text-[10px] font-bold uppercase px-1.5 py-0.2 rounded-md bg-[#FBE4E8] text-[#4A2E3A]">
                        Primary
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#8B7A82]">
                    {contact.relation} • {contact.phone}
                  </span>
                </div>
              </div>

              {!contact.isPrimary && (
                <button
                  onClick={() => handleDeleteContact(contact.id)}
                  className="p-2 text-[#8B7A82] hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Official Delhi Women Helpline Hotlines */}
      <div className="bg-[#FFFFFF] rounded-3xl p-5 space-y-3 shadow-xs">
        <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#8B7A82]">
          Verified Delhi Emergency Numbers
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <a
            href="tel:1091"
            className="p-3 rounded-2xl bg-[#FDF7F4] flex items-center gap-2 hover:bg-[#FBE4E8] transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#FBE4E8] flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 text-[#E89C8B]" />
            </div>
            <div>
              <span className="text-[12px] font-bold text-[#4A2E3A] block">1091</span>
              <span className="text-[10px] text-[#8B7A82] block">Women Police Helpline</span>
            </div>
          </a>

          <a
            href="tel:112"
            className="p-3 rounded-2xl bg-[#FDF7F4] flex items-center gap-2 hover:bg-[#FBE4E8] transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#FBE4E8] flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 text-[#E89C8B]" />
            </div>
            <div>
              <span className="text-[12px] font-bold text-[#4A2E3A] block">112</span>
              <span className="text-[10px] text-[#8B7A82] block">National Emergency</span>
            </div>
          </a>
        </div>
      </div>

      {/* Add Contact Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#FFFFFF] rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-[17px] font-bold text-[#4A2E3A]">Add Trusted Contact</h3>
            <div className="space-y-3">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Full Name (e.g. Diya Sharma)"
                className="w-full px-4 py-3 rounded-2xl bg-[#FDF7F4] text-[13px] font-semibold text-[#4A2E3A] outline-none"
              />
              <input
                type="tel"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                placeholder="Phone Number (+91 ...)"
                className="w-full px-4 py-3 rounded-2xl bg-[#FDF7F4] text-[13px] font-semibold text-[#4A2E3A] outline-none"
              />
              <input
                type="text"
                value={newRelation}
                onChange={(e) => setNewRelation(e.target.value)}
                placeholder="Relation (Sister, Best Friend, Flatmate)"
                className="w-full px-4 py-3 rounded-2xl bg-[#FDF7F4] text-[13px] font-semibold text-[#4A2E3A] outline-none"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-3 rounded-2xl bg-[#FDF7F4] text-[#8B7A82] font-semibold text-[13px]"
              >
                Cancel
              </button>
              <button
                onClick={handleAddContact}
                className="flex-1 py-3 rounded-2xl bg-[#E89C8B] text-white font-bold text-[13px]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
