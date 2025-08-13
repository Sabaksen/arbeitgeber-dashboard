import React, { useState, useEffect } from "react";

export default function EmployerOverview() {
  const [greeting, setGreeting] = useState("Guten Tag");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) setGreeting("Guten Morgen");
      else if (hour < 18) setGreeting("Guten Mittag");
      else setGreeting("Guten Abend");
    };

    updateGreeting();
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      updateGreeting();
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Placeholder data for the weekly chart
  const weekData = [
    { day: 'Mon', hours: 0 },
    { day: 'Tue', hours: 0 },
    { day: 'Wed', hours: 0 },
    { day: 'Thu', hours: 0 },
    { day: 'Fri', hours: 0 },
    { day: 'Sat', hours: 0 },
    { day: 'Sun', hours: 0 },
  ];

  // Calculate maximum hours for scaling the chart
  const maxHours = Math.max(...weekData.map(d => d.hours)) || 10;
  
  // Placeholder employee data
  const [selectedEmployee, setSelectedEmployee] = useState("Mitarbeitername");
  const employees = [
    { id: 1, name: "Mitarbeitername", position: "Position", avatar: "M" },
    { id: 2, name: "Mitarbeitername 2", position: "Position", avatar: "M" },
    { id: 3, name: "Mitarbeitername 3", position: "Position", avatar: "M" },
    { id: 4, name: "Mitarbeitername 4", position: "Position", avatar: "M" },
    { id: 5, name: "Mitarbeitername 5", position: "Position", avatar: "M" },
  ];

  return (
    <div className="h-screen flex flex-col bg-white w-full overflow-hidden">
      {/* Header Navigation */}
      <header className="bg-white shadow-md p-6 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <a href="/" className="flex items-center">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </a>
          <nav className="flex space-x-8">
            <a href="/" className="text-gray-700 hover:text-gray-900 text-lg">Dashboard</a>
            <a href="/employee-overview" className="text-gray-700 hover:text-gray-900 text-lg">Employee Overview</a>
            <a href="/employer-overview" className="text-gray-700 hover:text-gray-900 font-medium text-lg">Employer Overview</a>
          </nav>
        </div>
        {/* Orangefarbener Kreis entfernt */}
      </header>

      <div className="w-full p-6 flex-grow flex flex-col overflow-auto">
        {/* Time Tracking Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" style={{minHeight: '400px'}}>
          <div className="border-2 border-green-400 rounded-xl shadow-sm p-8 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center text-center">
              <div>
                <div className="text-gray-500 text-lg">Arbeitszeit</div>
                <div className="flex items-baseline justify-center">
                  <div className="text-4xl font-light">00:00</div>
                  <div className="ml-2 text-black text-sm">/ 00:00</div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-2 border-green-400 rounded-xl shadow-sm p-8 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center text-center">
              <div>
                <div className="text-gray-500 text-lg">Pausenzeit</div>
                <div className="flex items-baseline justify-center">
                  <div className="text-4xl font-light">00:00</div>
                  <div className="ml-2 text-gray-400 text-sm">/ 00:00</div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-2 border-green-400 rounded-xl shadow-sm p-8 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center text-center">
              <div>
                <div className="text-gray-500 text-lg">Overtime</div>
                <div className="flex items-baseline justify-center">
                  <div className="text-4xl font-light text-black">+00:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1 h-full">
          {/* Employee List - now on the left side */}
          <div className="md:col-span-1 flex flex-col h-full">
            <div className="border-2 border-green-400 rounded-xl shadow-sm p-5 flex-1 flex flex-col">
              <h2 className="text-xl font-medium mb-4">Mitarbeiter</h2>
              <div className="space-y-4 overflow-y-auto" style={{maxHeight: 'calc(100% - 2.5rem)'}}>
                <div className="h-full flex flex-col">
                {employees.map((employee) => (
                  <button
                    key={employee.id}
                    onClick={() => setSelectedEmployee(employee.name)}
                    className={`w-full flex items-center p-3 rounded-lg transition ${selectedEmployee === employee.name ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'}`}
                  >
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${selectedEmployee === employee.name ? 'bg-blue-500' : 'bg-gray-200'} text-white font-medium mr-3`}>
                      {employee.avatar}
                    </div>
                    <div className="text-left">
                      <div className={`font-medium ${selectedEmployee === employee.name ? 'text-blue-600' : 'text-gray-900'}`}>{employee.name}</div>
                      <div className="text-xs text-gray-500">{employee.position}</div>
                    </div>
                  </button>
                ))}
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Chart - now on the right side */}
          <div className="md:col-span-3 flex flex-col h-full">
            <div className="border-2 border-green-400 rounded-xl shadow-sm p-8 flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium">Arbeitsstunden diese Woche</h2>
                <div className="text-sm text-gray-600">{selectedEmployee}</div>
              </div>
              
              {/* Chart with grid lines like in the reference image */}
              <div className="relative flex-1">
                {/* Grid lines - horizontal (hours) */}
                <div className="absolute inset-0 grid grid-rows-4 w-full h-full">
                  <div className="border-t-2 border-gray-300 border-dashed relative">
                    <span className="absolute -left-6 -top-2 text-sm font-medium text-gray-600">10h</span>
                  </div>
                  <div className="border-t-2 border-gray-300 border-dashed relative">
                    <span className="absolute -left-6 -top-2 text-sm font-medium text-gray-600">6h</span>
                  </div>
                  <div className="border-t-2 border-gray-300 border-dashed relative">
                    <span className="absolute -left-6 -top-2 text-sm font-medium text-gray-600">3h</span>
                  </div>
                  <div className="border-t-2 border-gray-300 border-dashed relative">
                    <span className="absolute -left-6 -top-2 text-sm font-medium text-gray-600">0h</span>
                  </div>
                </div>
                
                {/* Grid lines - vertical (days) */}
                <div className="absolute inset-0 flex justify-between w-full h-full pointer-events-none">
                  {weekData.map((_, index) => (
                    <div key={`grid-${index}`} className="border-r-2 border-gray-300 border-dashed h-full" style={{width: '14.28%'}}></div>
                  ))}
                </div>
                
                {/* Bars */}
                <div className="absolute inset-0 flex items-end justify-between">
                  {weekData.map((item, index) => (
                    <div key={index} className="flex flex-col items-center" style={{width: '12%'}}>
                      <div className="flex flex-col items-center w-full">
                        <div 
                          className={`w-16 ${item.hours > 0 ? 'bg-blue-500' : 'bg-transparent'}`}
                          style={{ 
                            height: `${(item.hours / maxHours) * 100}%`, 
                            minHeight: item.hours > 0 ? '8px' : '0'
                          }}
                        ></div>
                        <div className="text-xs text-gray-500 mt-2">{item.day}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-center mt-4">
                <div className="flex items-center mr-4">
                  <div className="w-3 h-3 bg-blue-500 mr-1"></div>
                  <span className="text-xs">Arbeitszeit</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-teal-500 mr-1"></div>
                  <span className="text-xs">Pause</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grußbereich entfernt */}
      </div>
    </div>
  );
}
