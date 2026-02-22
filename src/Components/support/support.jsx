import React from 'react';
import { 
  MessageCircle, Mail, Phone, Book, FileText, Video, 
  HelpCircle, ExternalLink, Clock, PlayCircle, CheckCircle, 
  AlertCircle, ChevronRight, Search
} from 'lucide-react';

function Support() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <div className="max-w-[1600px] mx-auto px-6 py-8 pb-32 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Get Support</h2>
            <p className="text-slate-500 mt-1">Documentation, support resources, and contact options</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-full flex items-center gap-2 transition-colors shadow-sm shadow-blue-200">
            <MessageCircle className="w-5 h-5" /> Contact Support
          </button>
        </div>

        {/* Top Contact Channels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ContactCard 
            icon={MessageCircle} 
            title="Live Chat" 
            sub="Average response: 2 min"
            action={<div className="flex items-center gap-2 text-sm font-medium text-emerald-600"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Available Now</div>}
          />
          <ContactCard 
            icon={Mail} 
            title="Email Support" 
            sub="Response within 24h"
            action={<a href="#" className="text-sm font-medium text-blue-600 hover:underline">support@ipredict.com</a>}
          />
          <ContactCard 
            icon={Phone} 
            title="Phone Support" 
            sub="Business hours only"
            action={<a href="#" className="text-sm font-medium text-blue-600 hover:underline">+1 (555) 123-4567</a>}
          />
          <ContactCard 
            icon={Book} 
            title="Documentation" 
            sub="Comprehensive guides"
            action={<a href="#" className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline">Browse Docs <ExternalLink className="w-3 h-3" /></a>}
          />
        </div>

        {/* Middle Section: Knowledge Base & Tutorials */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Knowledge Base */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900">Knowledge Base</h3>
              <p className="text-slate-500 text-sm mt-1">Popular articles and guides</p>
            </div>
            <div className="space-y-6">
              <ResourceItem 
                icon={FileText} 
                iconColor="text-blue-600" 
                iconBg="bg-blue-50"
                title="Getting Started with iPredict" 
                meta="Setup • 5 min read" 
              />
              <ResourceItem 
                icon={FileText} 
                iconColor="text-blue-600" 
                iconBg="bg-blue-50"
                title="Device Registration Guide" 
                meta="Devices • 8 min read" 
              />
              <ResourceItem 
                icon={FileText} 
                iconColor="text-blue-600" 
                iconBg="bg-blue-50"
                title="Understanding Alert Types" 
                meta="Alerts • 6 min read" 
              />
              <ResourceItem 
                icon={FileText} 
                iconColor="text-blue-600" 
                iconBg="bg-blue-50"
                title="Analytics Dashboard Overview" 
                meta="Analytics • 10 min read" 
              />
              <ResourceItem 
                icon={FileText} 
                iconColor="text-blue-600" 
                iconBg="bg-blue-50"
                title="Security Best Practices" 
                meta="Security • 12 min read" 
              />
            </div>
          </div>

          {/* Video Tutorials */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900">Video Tutorials</h3>
              <p className="text-slate-500 text-sm mt-1">Step-by-step video guides</p>
            </div>
            <div className="space-y-6">
              <ResourceItem 
                icon={Video} 
                iconColor="text-purple-600" 
                iconBg="bg-purple-50"
                title="Platform Overview (2024)" 
                meta="15:30 • 2.4K views" 
              />
              <ResourceItem 
                icon={Video} 
                iconColor="text-purple-600" 
                iconBg="bg-purple-50"
                title="Managing Users and Permissions" 
                meta="12:45 • 1.8K views" 
              />
              <ResourceItem 
                icon={Video} 
                iconColor="text-purple-600" 
                iconBg="bg-purple-50"
                title="Device Configuration Tutorial" 
                meta="18:20 • 3.1K views" 
              />
              <ResourceItem 
                icon={Video} 
                iconColor="text-purple-600" 
                iconBg="bg-purple-50"
                title="Setting Up Alert Rules" 
                meta="10:15 • 1.5K views" 
              />
              <ResourceItem 
                icon={Video} 
                iconColor="text-purple-600" 
                iconBg="bg-purple-50"
                title="Advanced Analytics Features" 
                meta="22:40 • 980 views" 
              />
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900">Frequently Asked Questions</h3>
            <p className="text-slate-500 text-sm mt-1">Common questions from our users</p>
          </div>
          <div className="space-y-4">
            <FAQItem 
              question="How do I add a new device to the system?" 
              answer="Navigate to Devices → Add Device, then follow the setup wizard." 
            />
            <FAQItem 
              question="What are the different alert severity levels?" 
              answer="We have three levels: Info (informational), Warning (attention needed), and Critical (immediate action required)." 
            />
            <FAQItem 
              question="How can I export analytics data?" 
              answer="Use the Export button on the Analytics page to download data in CSV or PDF format." 
            />
            <FAQItem 
              question="What is the maximum number of devices supported?" 
              answer="Enterprise plans support unlimited devices. Contact sales for custom requirements." 
            />
            <FAQItem 
              question="How do I reset a user password?" 
              answer="Go to Users → Select user → Actions → Reset Password." 
            />
            <FAQItem 
              question="Can I customize alert thresholds?" 
              answer="Yes, navigate to Alerts → Settings to configure custom thresholds for each sensor type." 
            />
          </div>
        </div>

        {/* Recent Tickets Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="p-8 pb-4">
            <h3 className="text-xl font-bold text-slate-900">Your Recent Support Tickets</h3>
            <p className="text-slate-500 text-sm mt-1">Track your support requests</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-8 py-4">Ticket ID</th>
                  <th className="px-8 py-4">Subject</th>
                  <th className="px-8 py-4">Priority</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4">Last Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <TicketRow 
                  id="SUP-2025-045" 
                  subject="Device connection timeout issue" 
                  priority="High" 
                  status="In Progress" 
                  updated="2 hours ago" 
                />
                <TicketRow 
                  id="SUP-2025-044" 
                  subject="Question about analytics export" 
                  priority="Low" 
                  status="Resolved" 
                  updated="1 day ago" 
                />
                <TicketRow 
                  id="SUP-2025-043" 
                  subject="User permission setup help" 
                  priority="Medium" 
                  status="Resolved" 
                  updated="3 days ago" 
                />
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}

// --- Helper Components ---

function ContactCard({ icon: Icon, title, sub, action }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4 text-blue-600">
        <Icon className="w-5 h-5" />
      </div>
      <h4 className="font-semibold text-slate-900 mb-1">{title}</h4>
      <p className="text-xs text-slate-500 mb-4">{sub}</p>
      <div className="mt-auto pt-2">{action}</div>
    </div>
  )
}

function ResourceItem({ icon: Icon, iconColor, iconBg, title, meta }) {
  return (
    <div className="flex items-start gap-4 group cursor-pointer">
      <div className={`w-10 h-10 rounded-lg ${iconBg} ${iconColor} flex items-center justify-center shrink-0`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h5 className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors">{title}</h5>
        <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
          {meta.includes('views') ? <PlayCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
          {meta}
        </div>
      </div>
    </div>
  )
}

function FAQItem({ question, answer }) {
  return (
    <div className="border border-slate-200 rounded-xl p-4 hover:border-blue-300 transition-colors bg-slate-50/50">
      <div className="flex gap-4">
        <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <h5 className="font-medium text-slate-900 text-sm">{question}</h5>
          <p className="text-slate-500 text-sm mt-1 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  )
}

function TicketRow({ id, subject, priority, status, updated }) {
  const priorityStyles = {
    High: 'bg-red-50 text-red-700 border-red-100',
    Medium: 'bg-orange-50 text-orange-700 border-orange-100',
    Low: 'bg-blue-50 text-blue-700 border-blue-100',
  };

  const statusStyles = {
    'In Progress': 'bg-orange-50 text-orange-700 border-orange-200',
    Resolved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };

  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-8 py-4 text-sm font-medium text-slate-900">{id}</td>
      <td className="px-8 py-4 text-sm text-slate-600">{subject}</td>
      <td className="px-8 py-4">
        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${priorityStyles[priority]}`}>
          {priority}
        </span>
      </td>
      <td className="px-8 py-4">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyles[status]}`}>
          {status === 'Resolved' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
          {status}
        </span>
      </td>
      <td className="px-8 py-4 text-sm text-slate-500">{updated}</td>
    </tr>
  )
}

export default Support;