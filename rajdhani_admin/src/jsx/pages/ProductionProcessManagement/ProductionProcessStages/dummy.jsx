  {
                                                producitonProcessDetails?.data?.hose_cutting?.status === "Not Started" || producitonProcessDetails?.data?.hose_cutting?.status == null ?
                                                    <>
                                                        <StageStartButtonCard producitonProcessDetails={producitonProcessDetails} handleStartCutting={handleStartCutting} />
                                                    </>
                                                    :
                                                    <>
                                                        {/* Dropdown for number of rows or entries selection */}
                                                        <div className="justify-content-between d-sm-flex">
                                                            <div className="dataTables_length">
                                                                <label className="d-flex align-items-center">
                                                                    Show
                                                                    <Dropdown className="search-drop">
                                                                        <Dropdown.Toggle
                                                                            as="div"
                                                                            className="search-drop-btn">
                                                                            {sort}
                                                                        </Dropdown.Toggle>
                                                                        <Dropdown.Menu>
                                                                            <Dropdown.Item
                                                                                onClick={() => setSortata("2")}>
                                                                                2
                                                                            </Dropdown.Item>
                                                                            <Dropdown.Item
                                                                                onClick={() => setSortata("5")}>
                                                                                5
                                                                            </Dropdown.Item>
                                                                            <Dropdown.Item
                                                                                onClick={() => setSortata("10")}>
                                                                                10
                                                                            </Dropdown.Item>
                                                                            <Dropdown.Item
                                                                                onClick={() => setSortata("15")}>
                                                                                15
                                                                            </Dropdown.Item>
                                                                            <Dropdown.Item
                                                                                onClick={() => setSortata("20")}>
                                                                                20
                                                                            </Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown>
                                                                    entries
                                                                </label>
                                                            </div>
                                                        </div>
                                                        {/* Tables */}
                                                        <table id="example4" className="display dataTable no-footer w-100">
                                                            {/* Table Headings */}
                                                            <thead>
                                                                <tr>
                                                                    {theadData?.map((item, ind) => {
                                                                        return (
                                                                            <>
                                                                                {item.sortingVale === "verify" ? (
                                                                                    <th
                                                                                        key={ind}
                                                                                        style={{
                                                                                            display: 'flex',
                                                                                            flexDirection: 'column', // stack text and checkbox vertically
                                                                                            alignItems: 'center',    // center horizontally
                                                                                            justifyContent: 'center', // center vertically if needed
                                                                                            padding: '10px',
                                                                                            userSelect: 'none',
                                                                                        }}
                                                                                    >
                                                                                        <span style={{ fontWeight: '600', marginBottom: '6px' }}>
                                                                                            {item.heading}
                                                                                        </span>

                                                                                        <label
                                                                                            style={{
                                                                                                display: 'flex',
                                                                                                alignItems: 'center',
                                                                                                justifyContent: 'center',
                                                                                                width: '15px',
                                                                                                height: '15px',
                                                                                                borderRadius: '50%',
                                                                                                transition: 'background-color 0.2s ease, transform 0.2s ease',
                                                                                                cursor: 'pointer',
                                                                                            }}
                                                                                            onMouseEnter={(e) => {
                                                                                                e.currentTarget.style.backgroundColor = 'rgba(0, 123, 255, 0.1)';
                                                                                            }}
                                                                                            onMouseLeave={(e) => {
                                                                                                e.currentTarget.style.backgroundColor = 'transparent';
                                                                                            }}
                                                                                        >
                                                                                            <input
                                                                                                type="checkbox"
                                                                                                checked={selectAll}
                                                                                                onChange={(e) => {
                                                                                                    const checked = e.target.checked;
                                                                                                    setSelectAll(checked);

                                                                                                    if (checked) {
                                                                                                        const allIds = purchaseOrderProdcutList.map((item) => item._id);
                                                                                                        setSelectedProducts(allIds);
                                                                                                    } else {
                                                                                                        setSelectedProducts([]);
                                                                                                    }
                                                                                                }}
                                                                                                onClick={(e) => e.stopPropagation()}
                                                                                                style={{
                                                                                                    width: '20px',
                                                                                                    height: '20px',
                                                                                                    borderRadius: '50%',
                                                                                                    accentColor: '#007bff',
                                                                                                    cursor: 'pointer',
                                                                                                    transition: 'transform 0.2s ease',
                                                                                                }}
                                                                                                onMouseDown={(e) => {
                                                                                                    e.target.style.transform = 'scale(0.9)';
                                                                                                }}
                                                                                                onMouseUp={(e) => {
                                                                                                    e.target.style.transform = 'scale(1)';
                                                                                                }}
                                                                                            />
                                                                                        </label>
                                                                                    </th>
                                                                                ) : (
                                                                                    <th
                                                                                        key={ind}
                                                                                        onClick={() => {
                                                                                            SotingData(item?.sortingVale, ind);
                                                                                            setIconDate((prevState) => ({
                                                                                                complete: !prevState.complete,
                                                                                                ind: ind,
                                                                                            }));
                                                                                        }}
                                                                                        style={{
                                                                                            maxWidth: '140px',
                                                                                            minWidth: '100px',
                                                                                            padding: '8px 12px',
                                                                                            textAlign: 'left', // ✅ align everything to left
                                                                                            verticalAlign: 'middle',
                                                                                            whiteSpace: 'normal',
                                                                                            wordBreak: 'break-word',
                                                                                        }}
                                                                                    >
                                                                                        <div
                                                                                            style={{
                                                                                                display: 'flex',
                                                                                                flexDirection: 'column',
                                                                                                alignItems: 'flex-start', // ✅ align items to left
                                                                                                lineHeight: '1',
                                                                                                gap: '2px',
                                                                                            }}
                                                                                        >
                                                                                            {/* First line: Heading + icon */}
                                                                                            <div
                                                                                                style={{
                                                                                                    display: 'flex',
                                                                                                    alignItems: 'center',
                                                                                                    gap: '6px', // ✅ cleaner space between text and icon
                                                                                                    fontWeight: 600,
                                                                                                    fontSize: '13px',
                                                                                                }}
                                                                                            >
                                                                                                <span>{item.heading.split(' ')[0]}</span>
                                                                                                {ind !== iconData.ind ? (
                                                                                                    <i className="fa fa-sort fs-12" style={{ opacity: '0.3' }} />
                                                                                                ) : iconData.complete ? (
                                                                                                    <i className="fa fa-arrow-down fs-12" style={{ opacity: '0.7' }} />
                                                                                                ) : (
                                                                                                    <i className="fa fa-arrow-up fs-12" style={{ opacity: '0.7' }} />
                                                                                                )}
                                                                                            </div>

                                                                                            {/* Second line: Rest of heading */}
                                                                                            <div style={{ fontWeight: 600, fontSize: '13px' }}>
                                                                                                {item.heading.split(' ').slice(1).join(' ')}
                                                                                            </div>
                                                                                        </div>
                                                                                    </th>


                                                                                )}

                                                                            </>


                                                                        );
                                                                    })}
                                                                </tr>
                                                            </thead>
                                                            <tbody >
                                                                {rows?.map((row, index) => (
                                                                    <tr key={row.id}
                                                                        //  onClick={() => handleVerifyClick(row)} 
                                                                        // onClick={(e) => {
                                                                        //     const target = e.target;

                                                                        //     // Prevent modal from opening when clicking on an active input or button
                                                                        //     if (target.tagName === "BUTTON") return;
                                                                        //     if (target.tagName === "INPUT" && !target.disabled) return;

                                                                        //     // Open modal if clicking on a disabled input or any other row area
                                                                        //     handleVerifyClick(row);
                                                                        // }}
                                                                        style={{ cursor: "pointer" }}>
                                                                        <td><strong>{index + 1}</strong> </td>
                                                                        {/* Part No.  */}
                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                placeholder="Part No"
                                                                                value={row?.part_no}
                                                                                onClick={() =>
                                                                                    setFocusedInputIndex((prev) => (prev === index ? null : index))
                                                                                }
                                                                                // onChange={(e) =>
                                                                                //   handleChangeRow(index, "product_name", e.target.value)
                                                                                // }
                                                                                className="form-control row-input"
                                                                                style={{
                                                                                    width: focusedInputIndex === index ? "300px" : "180px",
                                                                                    transition: "width 0.3s ease",
                                                                                    cursor: "pointer",
                                                                                }}
                                                                            />
                                                                        </td>
                                                                        {/* Sheet Quantity */}
                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                // placeholder="Qty"
                                                                                value={row?.sheet_total_quantity}
                                                                                // onChange={(e) =>
                                                                                //     handleChangeRow(
                                                                                //         index,
                                                                                //         "sheet_total_quantity",
                                                                                //         e.target.value
                                                                                //     )
                                                                                // }
                                                                                className="form-control row-input"
                                                                                style={{ width: "60px" }}
                                                                            />
                                                                        </td>
                                                                        {/* quantity_accepted */}
                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                placeholder="Quantity"
                                                                                value={row?.quantity_accepted}
                                                                                onChange={(e) =>
                                                                                    handleChangeRow(index, "quantity_accepted", e.target.value)
                                                                                }
                                                                                className={`form-control row-input ${inputErrors[index]?.quantity_accepted ? 'is-invalid' : ''
                                                                                    }`}
                                                                                style={{ width: "100px" }}
                                                                            />
                                                                            {inputErrors[index]?.quantity_accepted && (
                                                                                <div className="invalid-feedback" style={{ fontSize: '8px' }}>
                                                                                    {inputErrors[index].quantity_accepted}
                                                                                </div>
                                                                            )}
                                                                        </td>

                                                                        {/* quantity_rejected */}
                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                placeholder="Quantity"
                                                                                value={row?.quantity_rejected ?? ''}
                                                                                onChange={(e) =>
                                                                                    handleChangeRow(index, "quantity_rejected", e.target.value)
                                                                                }
                                                                                className={`form-control row-input ${inputErrors[index]?.quantity_rejected ? 'is-invalid' : ''
                                                                                    }`}
                                                                                style={{ width: "90px" }}
                                                                            />
                                                                            {inputErrors[index]?.quantity_rejected && (
                                                                                <div className="invalid-feedback" style={{ fontSize: '8px' }}>
                                                                                    {inputErrors[index].quantity_rejected}
                                                                                </div>
                                                                            )}
                                                                        </td>

                                                                        {/* last_updated_quantity */}
                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                placeholder="Quantity"
                                                                                value={row?.last_updated_quantity}
                                                                                onChange={(e) =>
                                                                                    handleChangeRow(
                                                                                        index,
                                                                                        "last_updated_quantity",
                                                                                        e.target.value
                                                                                    )
                                                                                }
                                                                                className="form-control row-input"
                                                                                style={{ width: "90px" }}
                                                                                disabled
                                                                            />
                                                                        </td>
                                                                        {/* Remark */}
                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                placeholder="Enter Remark"
                                                                                value={row?.remark}
                                                                                onChange={(e) =>
                                                                                    handleChangeRow(
                                                                                        index,
                                                                                        "remark",
                                                                                        e.target.value
                                                                                    )
                                                                                }
                                                                                className="form-control row-input"
                                                                                style={{ width: "170px" }}
                                                                            />
                                                                        </td>
                                                                        {/* Line number */}
                                                                        <td>
                                                                            <Select
                                                                                options={lineNumberOptions}
                                                                                value={lineNumberOptions?.find(option => option.value === row?.line_number) || null}
                                                                                onChange={(selectedOption) =>
                                                                                    handleChangeRow(index, "line_number", selectedOption?.value || '')
                                                                                }
                                                                                className="react-select-container"
                                                                                classNamePrefix="react-select"
                                                                                placeholder="Line No."
                                                                                menuPortalTarget={document.body} // 👈 Makes menu render at body level
                                                                                isClearable
                                                                                styles={{
                                                                                    container: (base) => ({
                                                                                        ...base,
                                                                                        width: 120,
                                                                                    }),
                                                                                    control: (base) => ({
                                                                                        ...base,
                                                                                        minHeight: '30px',
                                                                                        height: '35px',
                                                                                        fontSize: '12px',
                                                                                        padding: '0 2px',
                                                                                        alignItems: 'center',
                                                                                    }),
                                                                                    indicatorsContainer: (base) => ({
                                                                                        ...base,
                                                                                        height: '28px',
                                                                                        // alignItems: 'center',
                                                                                        paddingTop: '2px',
                                                                                    }),
                                                                                    dropdownIndicator: (base) => ({
                                                                                        ...base,
                                                                                        padding: '2px',
                                                                                        marginTop: '2px', // move arrow up slightly
                                                                                    }),
                                                                                    valueContainer: (base) => ({
                                                                                        // ...base,
                                                                                        height: '100%',
                                                                                        marginLeft: '5px',
                                                                                        display: 'flex',
                                                                                        alignItems: 'center',
                                                                                        fontSize: '13px',
                                                                                        lineHeight: 'normal', // ensures text is vertically aligned
                                                                                    }),
                                                                                    indicatorSeparator: (base) => ({
                                                                                        ...base,
                                                                                        height: '28px', // shorter vertical line
                                                                                        margin: '0 4px',
                                                                                    }),
                                                                                    menuPortal: (base) => ({
                                                                                        ...base,
                                                                                        zIndex: 9999,
                                                                                    }),
                                                                                }}

                                                                            />

                                                                        </td>
                                                                        {/* Operator Name  */}

                                                                        <td>
                                                                            <Select
                                                                                options={searchTerms[index] ? operatorsOption : []}
                                                                                placeholder="Search operator"
                                                                                isLoading={loading}
                                                                                // value={
                                                                                //     rowOperatorOptions[index]?.find(
                                                                                //         (option) => option.label === row?.operator_name
                                                                                //     )
                                                                                // }
                                                                                value={operatorsOption?.find((item) => item?.label === row?.operator_name)}

                                                                                onChange={(selectedOption) => {
                                                                                    handleChangeRow(index, {
                                                                                        operator_name: selectedOption?.label || "",
                                                                                        operator_id: selectedOption?.value || "",
                                                                                    });
                                                                                }}
                                                                                onInputChange={(inputValue) => handleOperatorNameSearch(inputValue, index)}
                                                                                onFocus={() => setFocusedRowIndex(index)}
                                                                                onMenuClose={() =>
                                                                                    setSearchTerms((prev) => ({ ...prev, [index]: "" }))
                                                                                }
                                                                                menuIsOpen={focusedRowIndex === index && !!searchTerms[index]}
                                                                                isClearable
                                                                                menuPortalTarget={document.body}
                                                                                noOptionsMessage={() => "No matching operators found"}
                                                                                styles={{
                                                                                    container: (base) => ({
                                                                                        ...base,
                                                                                        width: 210,
                                                                                    }),
                                                                                    control: (base) => ({
                                                                                        ...base,
                                                                                        minHeight: '30px',
                                                                                        height: '35px',
                                                                                        fontSize: '12px',
                                                                                        padding: '0 2px',
                                                                                        alignItems: 'center',
                                                                                    }),
                                                                                    indicatorsContainer: (base) => ({
                                                                                        ...base,
                                                                                        height: '28px',
                                                                                        // alignItems: 'center',
                                                                                        paddingTop: '2px',
                                                                                    }),
                                                                                    dropdownIndicator: (base) => ({
                                                                                        ...base,
                                                                                        padding: '2px',
                                                                                        marginTop: '2px', // move arrow up slightly
                                                                                    }),
                                                                                    valueContainer: (base) => ({
                                                                                        // ...base,
                                                                                        height: '100%',
                                                                                        display: 'flex',
                                                                                        marginLeft: '5px',
                                                                                        alignItems: 'center',
                                                                                        fontSize: '13px',
                                                                                        lineHeight: 'normal', // ensures text is vertically aligned
                                                                                    }),
                                                                                    indicatorSeparator: (base) => ({
                                                                                        ...base,
                                                                                        height: '28px', // shorter vertical line
                                                                                        margin: '0 4px',
                                                                                    }),
                                                                                    menuPortal: (base) => ({
                                                                                        ...base,
                                                                                        zIndex: 9999,
                                                                                    }),
                                                                                }}
                                                                            />
                                                                        </td>

                                                                        {/* Log Activity button */}
                                                                        <td>
                                                                            <button
                                                                                onClick={() => handleOpenLogModal(row.id)}
                                                                                style={{
                                                                                    backgroundColor: '#f0f4ff',
                                                                                    border: '1px solid #3b82f6',
                                                                                    color: '#1e40af',
                                                                                    fontSize: '12px',
                                                                                    padding: '4px 10px',
                                                                                    borderRadius: '6px',
                                                                                    fontWeight: 500,
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    gap: '4px',
                                                                                    cursor: 'pointer',
                                                                                    transition: 'all 0.2s ease-in-out',
                                                                                    boxShadow: '0 1px 2px rgba(59, 130, 246, 0.1)',
                                                                                    whiteSpace: 'nowrap',
                                                                                }}
                                                                                onMouseEnter={(e) => {
                                                                                    e.currentTarget.style.backgroundColor = '#3b82f6';
                                                                                    e.currentTarget.style.color = '#ffffff';
                                                                                    e.currentTarget.style.boxShadow = '0 2px 6px rgba(59, 130, 246, 0.3)';
                                                                                }}
                                                                                onMouseLeave={(e) => {
                                                                                    e.currentTarget.style.backgroundColor = '#f0f4ff';
                                                                                    e.currentTarget.style.color = '#1e40af';
                                                                                    e.currentTarget.style.boxShadow = '0 1px 2px rgba(59, 130, 246, 0.1)';
                                                                                }}
                                                                            >
                                                                                <span style={{ fontSize: '13px' }}>🕒</span>
                                                                                Log Activity
                                                                            </button>
                                                                        </td>



                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                        {/* Pagination buttons */}
                                                        <div>
                                                            {/* {brandList?.data?.length < brandList?.total && ( */}
                                                            <div className="d-sm-flex text-center justify-content-end align-items-center mt-3">
                                                                <div className="pagination-container">
                                                                    <ReactPaginate
                                                                        pageCount={Math.ceil(
                                                                            producitonProcessItemsAnalytics?.totalItems /
                                                                            producitonProcessItemsAnalytics?.rowsPerPage
                                                                        )}
                                                                        pageRangeDisplayed={1}
                                                                        marginPagesDisplayed={2}
                                                                        onPageChange={handlePageClick}
                                                                        containerClassName="pagination"
                                                                        activeClassName="selected"
                                                                        disabledClassName="disabled"
                                                                    />
                                                                </div>
                                                            </div>
                                                            {/* )} */}
                                                        </div>
                                                    </>
                                            }