import React from 'react';
import { observer } from 'mobx-react-lite';
import PhoneIcon from "../icons/PhoneIcon";

const UserItem = observer(({ user, onSelect, isSelected }) => {
    return (
        <div
            className={`p-4 border-b border-gray-100 cursor-pointer transition-all
        ${isSelected
                ? 'bg-blue-50 border-l-4 border-blue-500'
                : 'hover:bg-gray-50 hover:pl-5'}`}
            onClick={onSelect}
        >
            <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">{user.Fullname}</h3>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                        <span>{user.Email}</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <PhoneIcon className='w-4 h-4 text-gray-400'/>
                        <span>{user.Phone}</span>
                    </div>
                </div>

                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
          ${user.IsAdmin ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {user.IsAdmin ? 'Администратор' : 'Пользователь'}
                </div>
            </div>
        </div>
    );
});

export default UserItem;