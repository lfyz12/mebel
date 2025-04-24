import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Context} from "../../index";
import FacadeTableItem from "./FacadeTableItem";
import FacadeModal from "./FacadeModal";
import {observer} from "mobx-react-lite";
import PlusIcon from "../icons/PlusIcon";

const FacadeSection = () => {
    const {facadeStore} = useContext(Context)
    const [facades, setFacades] = useState(null)
    const [show,setShow] = useState(false)
    const [search, setSearch] = useState('');

    const handleSearch = () => {
        facadeStore.setSearchQuery(search);
    };


    useEffect(() => {
        handleSearch()
    }, [search]);

    const onClose = () => setShow(false)
    const fetchFacades = async () => {
        await facadeStore.getAll().then(res => setFacades(res))
    }

    useEffect(() => {
        fetchFacades()
    }, [facadeStore.facade, facadeStore._facadeItem]);

    const dynamicFacades = useMemo(() => {
        if (!facadeStore.searchFacades()) {
            return;
        }
        return !facadeStore.searchFacades().sort((a, b) => a.FacadeID - b.FacadeID)
    }, [facades])

    if (!facades) {
        return (
            <div className="max-w-2xl mx-auto p-4 md:p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            <div className="h-10 bg-gray-200 rounded-xl"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="px-4 sm:px-6 lg:px-2 py-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Управление товарами
                </h1>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <input
                        type="search"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full sm:w-64 px-4 py-2 rounded-full border border-gray-300
                 focus:ring-2 focus:ring-[#054C73] focus:border-transparent
                 transition-all placeholder-gray-400 text-sm"
                        placeholder="Поиск фасадов..."
                    />

                    <button
                        onClick={() => setShow(true)}
                        className="w-full sm:w-auto bg-[#054C73] hover:bg-[#033952] text-white
                 px-4 py-2 rounded-lg transition-colors flex items-center gap-2
                 justify-center text-sm sm:text-base"
                    >
                        <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5"/>
                        <span>Добавить фасад</span>
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        {["№", "Фото", "Название", "Материал", "Задняя сторона", "Серия", "Покрытие", "Патина", "Пространство", "Направление", "Гарантия", "Цена", "Описание", "Действия"].map((header) => (
                            <th
                                key={header}
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {facadeStore.searchFacades().map((facade) => (
                        <FacadeTableItem key={facade.FacadeID} facade={facade}/>
                    ))}
                    </tbody>
                </table>
            </div>

            {show && <FacadeModal onClose={onClose} isAction="create"/>}
        </div>
    );
};

export default observer(FacadeSection);