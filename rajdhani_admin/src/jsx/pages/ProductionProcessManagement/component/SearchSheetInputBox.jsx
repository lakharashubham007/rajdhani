import React, { useEffect, useRef, useState } from 'react'
import Select from "react-select";
import { SearchProductsApi } from '../../../../services/apis/Product';
import { Toaster } from "../../../components/Toaster/Toster";
import { SearchProductionSheetApi } from '../../../../services/apis/ProductionProcessApi';

const SearchSheetInputBox = ({onSheetSelect}) => {
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [productionSheetOption, setProductionSheetOption] = useState([]);
    const [selectedSheet, setSelectedSheet] = useState(null);
    const [productformData, setProductFormData] = useState();
    const [errors, setErrors] = useState();

    // console.log("selectedSheet",selectedSheet)

    //API Call Method:- Search Product and fetch
    const fetchSheetSearchResults = async (query) => {
        if (!query) return; // Prevent empty requests
        // setLoading(true);
        try {
            const res = await SearchProductionSheetApi(query); // API should support search
            const dropdownProductList = res?.data?.sheets?.map((data) => ({
                value: data?._id,
                label: `[${data?.sheet_no}]  [${data?.order_no}]${data?.fitting_Code ? ` ⇨[${data?.fitting_Code}]` : ""}`,
                id: data?._id,
                sheet_no: data?.sheet_no
            }));
            setProductionSheetOption(dropdownProductList);
        } catch (error) {
            Toaster.error("Failed to load products. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const debounceTimer = useRef(null);

    const debounceSearch = (query) => {
        clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => {
            fetchSheetSearchResults(query);
        }, 500); // 500ms delay
    };

    const handleSheetChange = (selectedOption) => {
        setSelectedSheet(selectedOption);
        setProductFormData(selectedOption);
        onSheetSelect(selectedOption)
    };

    const handleSearch = (inputValue) => {
        setSearchTerm(inputValue);
        if (inputValue.length > 1) {
            debounceSearch(inputValue);
        }
    };

    // Custom styles to ensure dropdown appears above all
    const customStyles = {
        menu: (provided) => ({
            ...provided,
            zIndex: 9999, // Very high to be on top of modals, etc.
            position: 'absolute',
        }),
    };

    return (
        <div>
            <div className="col-md-12 mb-4">
                <label className="col-form-label">Enter Sheet Number/Order Number</label>
                {/* Search Button */}
                <Select
                    options={searchTerm ? productionSheetOption : []}
                    placeholder="Search product by code ..."
                    isLoading={loading}
                    value={selectedSheet}
                    onChange={handleSheetChange}
                    onInputChange={handleSearch}
                    noOptionsMessage={() => "No matching products found"}
                    isClearable
                    menuIsOpen={!!searchTerm}
                    styles={customStyles}
                />
                {errors?.hose_assembly && (
                    <span className="text-danger fs-12">{errors?.hose_assembly}</span>
                )}
            </div>

        </div>
    )
}

export default SearchSheetInputBox