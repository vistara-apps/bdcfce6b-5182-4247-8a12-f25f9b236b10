import React from 'react';

interface AppShellProps {
  header?: React.ReactNode;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ header, children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {header && (
        <header className="bg-white border-b border-gray-200">
          {header}
        </header>
      )}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

