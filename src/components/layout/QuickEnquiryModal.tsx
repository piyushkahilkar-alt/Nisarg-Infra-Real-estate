import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import toast from 'react-hot-toast';

interface QuickEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectInterested?: string;
}

export default function QuickEnquiryModal({ isOpen, onClose, projectInterested = 'General Enquiry' }: QuickEnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    location: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'leads'), {
        ...formData,
        projectInterested,
        status: 'New Lead',
        createdAt: new Date().toISOString()
      });
      toast.success("Enquiry submitted successfully! We will contact you soon.");
      setFormData({ name: '', email: '', phone: '', budget: '', location: '', message: '' });
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit enquiry.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden relative animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-[#E2E8F0] flex justify-between items-center bg-[#FAFAF7]">
          <div>
             <h2 className="text-xl font-extrabold text-[#1E293B]">Quick Enquiry</h2>
             <p className="text-sm text-[#64748B]">Fill out the details below to get a call back.</p>
          </div>
          <button onClick={onClose} className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors border border-[#E2E8F0]">
            <X className="h-5 w-5 text-[#1E293B]" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#64748B] uppercase mb-1">Full Name *</label>
              <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 outline-none focus:border-[#137A35] transition-colors bg-[#FAFAF7]" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#64748B] uppercase mb-1">Contact Number *</label>
              <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 outline-none focus:border-[#137A35] transition-colors bg-[#FAFAF7]" placeholder="+91 9876543210" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#64748B] uppercase mb-1">Email Address *</label>
              <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 outline-none focus:border-[#137A35] transition-colors bg-[#FAFAF7]" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#64748B] uppercase mb-1">Budget Range *</label>
              <select required value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 outline-none focus:border-[#137A35] transition-colors bg-[#FAFAF7]">
                <option value="">Select Budget</option>
                <option value="10L-25L">₹10L - ₹25L</option>
                <option value="25L-50L">₹25L - ₹50L</option>
                <option value="50L-1Cr">₹50L - ₹1Cr</option>
                <option value="1Cr+">₹1Cr+</option>
              </select>
            </div>
          </div>

          <div>
             <label className="block text-xs font-bold text-[#64748B] uppercase mb-1">Preferred Location *</label>
             <input required type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 outline-none focus:border-[#137A35] transition-colors bg-[#FAFAF7]" placeholder="e.g. Nagpur, Wardha Road" />
          </div>

          <div>
             <label className="block text-xs font-bold text-[#64748B] uppercase mb-1">Message (Optional)</label>
             <textarea rows={3} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 outline-none focus:border-[#137A35] transition-colors bg-[#FAFAF7] resize-none" placeholder="Any specific requirements?"></textarea>
          </div>

          <button disabled={submitting} type="submit" className="w-full bg-[#137A35] text-white font-bold py-3.5 rounded-lg hover:bg-[#29A53A] transition-colors flex items-center justify-center">
             {submitting ? <Loader2 className="animate-spin h-5 w-5" /> : 'Submit Enquiry'}
          </button>
        </form>
      </div>
    </div>
  );
}
