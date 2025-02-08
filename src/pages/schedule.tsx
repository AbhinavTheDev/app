import { AlertTriangle, Calendar, Clock, Mail, Phone, Truck } from 'lucide-react';
export default function CollectionSchedule({ onBack }: { onBack: () => void }) {
    const schedule = [
      { day: 'Monday', times: ['7:00 AM', '9:00 AM'] },
      { day: 'Tuesday', times: ['7:00 AM', '8:00 AM'] },
      { day: 'Wednesday', times: ['8:00 AM', '9:00 AM'] },
      { day: 'Thursday', times: [ '9:00 AM'] },
      { day: 'Friday', times: [ '8:00 AM'] },
      { day: 'Saturday', times: ['7:00 AM'] },
      { day: 'Sunday', times: ['8:00 AM'] }
    ];
  
    const authorities = [
      {
        title: 'Municipal Corporation of Delhi (MCD)',
        contact: '155305',
        email: 'mcd-ithelpdesk@mcd.nic.in'
      },
    //   {
    //     title: 'Emergency Support',
    //     contact: '+91 XXXXXXXXXX',
    //     email: 'emergency@municipality.gov.in'
    //   }
    ];
  
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-md mx-auto min-h-screen relative pb-16">
          <div className="bg-green-600 p-6 rounded-b-3xl shadow-lg">
            <button
              onClick={onBack}
              className="text-white mb-4 hover:text-green-100"
            >
              ← Back
            </button>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Truck className="w-6 h-6" />
              Waste Collection Schedule
            </h2>
          </div>
  
          <div className="p-4 space-y-6">
            {/* Schedule Section */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-green-600 p-4 text-white flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <h3 className="font-semibold">Weekly Schedule</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {schedule.map((day, index) => (
                  <div key={index} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-800">{day.day}</span>
                      <div className="flex gap-2">
                        {day.times.map((time, timeIndex) => (
                          <span
                            key={timeIndex}
                            className="text-sm px-2 py-1 bg-green-50 text-green-600 rounded-full flex items-center gap-1"
                          >
                            <Clock className="w-3 h-3" />
                            {time}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
  
            {/* Important Information */}
            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
              <div className="flex items-center gap-2 text-yellow-700 mb-3">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-semibold">Important Information</h3>
              </div>
              <ul className="space-y-2 text-sm text-yellow-700">
                <li>• Please keep waste segregated and ready before collection time</li>
                <li>• Collection timings may vary by 15-20 minutes</li>
                <li>• Special collection requests need 24 hours notice</li>
                <li>• No collection on public holidays</li>
              </ul>
            </div>
  
            {/* Authorities Contact */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-green-800 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Authority Contacts
              </h3>
  
              {authorities.map((authority, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">{authority.title}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <a href={`tel:${authority.contact}`} className="hover:text-green-600">
                        {authority.contact}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <a href={`mailto:${authority.email}`} className="hover:text-green-600">
                        {authority.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }