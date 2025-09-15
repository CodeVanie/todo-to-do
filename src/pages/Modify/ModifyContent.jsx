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
        setSelectedType, 
        handleSelectedItems, 
        unselectAll 
    } = useSelect();
    const { listData } = useContext(AppContext);

    useEffect(() => {
        setSelectedItems(new Set());
        setSelectedType(null);
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
                <ActionButton isActive={selectedType !== "sort"} name="addrow" onClick={handleAddButton}/>
                <ActionButton isActive={selectedItems.size !== 0} name="editrow" onClick={handleEditButton}/>
                <ActionButton isActive={selectedType !== "sort" && selectedItems.size !== 0} 
                name="deleterow" onClick={handleDeleteButton}/>
                <ActionButton isActive={selectedItems.size !== 0 || selectedType} name="reset" onClick={unselectAll}/>
            </ActionButtonWrapper>
            <SheetsSection>
            {listData.map((data) => 
                <Sheet key={data.type} title={`Edit ${data.label} List`} 
                onSelect={() => setSelectedType(data.type)} 
                isSelected={selectedType === data.type}>
                    <SheetList>
                        {data.list.map((item) => 
                            <SheetItem key={item.id} item={item} onSelect={() => 
                            handleSelectedItems(item.id, data.type)} selected={selectedItems} />
                        )}
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