import { useContext, useEffect } from 'react'
import Sheet from './Sheets/Sheet.jsx';
import SheetList from './Sheets/SheetList.jsx';
import { ActionButton } from '../../shared/components/Button/buttons.js';
import { AppContext } from '../../context/app-context.jsx';
import { useSelect } from "../../hooks.js";
import ModifyContentWrapper from '../../layouts/ModifyContentWrapper.jsx';
import ActionButtonWrapper from '../../layouts/ActionButtonWrapper.jsx';
import SheetsSection from './Sheets/SheetsSection.jsx';
import SheetItem from './Sheets/SheetItem.jsx';
import { Outlet, useNavigate } from 'react-router-dom';
import AlertContextProvider from '../../context/alert-context.jsx';

export default function ModifyContent() {
    // console.log("ModifyContent Rendered");
    const navigate = useNavigate();
    const { 
        selectedItems, 
        selectedType, 
        setSelectedItems, 
        handleSheetSelect, 
        handleSelectedItems, 
        unselectAll 
    } = useSelect();
    const { listData } = useContext(AppContext);

    useEffect(() => {
        if (selectedItems.size !== 0) {
            setSelectedItems(new Set());
        }
    },[listData])

    function handleAddButton() {
        selectedType === "todo" ? navigate(`add/todo`) : 
        selectedType === "category" ? navigate(`add/category`) : 
        navigate(`alert/a_0`);
    }

    function handleEditButton() {
        if (selectedItems.size === 1) {
            const id = [...selectedItems][0];
            const item = listData[0].list.find(c => c.id === id) || 
                        listData[1].list.find(t => t.id === id) || 
                        listData[2].list.find(s => s.id === id);
            selectedType === "todo" && navigate(`edit/todo/${item.id}`);
            selectedType === "category" && navigate(`edit/category/${item.id}`);
            selectedType === "sort" && navigate(`edit/sort/${item.id}`);
        } else if (selectedItems.size === 0) {
            navigate(`alert/a_1`);
        } else {
            navigate(`alert/a_2`);
        }
    }

    function handleDeleteButton() {
        selectedItems.size !== 0 ? 
        navigate("delete/confirm", { 
            state: { 
                selectedItems: [...selectedItems], 
                selectedType 
            }
        }) : 
        navigate(`alert/a_1`);
    }

    return (
        <ModifyContentWrapper>
            <ActionButtonWrapper>
                <ActionButton onClick={handleAddButton} name="addrow" size="md" variant="cream" isActive={selectedType !== "sort"} />
                <ActionButton onClick={handleEditButton} name="editrow" size="md" variant="cream" isActive={selectedItems.size === 1} />
                <ActionButton onClick={handleDeleteButton} name="deleterow" size="md" variant="cream" isActive={selectedType !== "sort" && selectedItems.size !== 0} />
                <ActionButton onClick={unselectAll} name="reset" size="md" variant="cream" isActive={selectedItems.size !== 0} />
            </ActionButtonWrapper>
            <SheetsSection onSheetChange={handleSheetSelect} selectedType={selectedType}>
            {listData.map((data) => 
                <Sheet key={data.type} title={`Edit ${data.label} List`} 
                onSelect={() => handleSheetSelect(data.type)} 
                isSelected={selectedType === data.type}>
                    <SheetList>
                        {data.list.map((item) => 
                            <SheetItem key={item.id} item={item} onSelect={() => 
                            handleSelectedItems(item.id, data.type)} selected={selectedItems} />
                        )}
                        {data.list.length === 0 && 
                        <li className="pointer-events-none text-center py-4 px-3 font-bold border-yellow-900 text-2xl text-ptlbrown-100 cursor-pointer hover:bg-ptlbrown-300/10 active:bg-ptlbrown-300/10">
                            <span className="block overflow-hidden w-full whitespace-nowrap">No item available</span>
                        </li>}
                    </SheetList>
                </Sheet>
            )}
            </SheetsSection>
            <AlertContextProvider>
                <Outlet />
            </AlertContextProvider>
        </ModifyContentWrapper>
    )
}