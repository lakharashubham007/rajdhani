        {/* SECTION 3RD Restaurants & Category Infoo*/}
        <div className="row">
        <div className="col-xl-3 col-lg-3 flex ">
          <div className="card">
            <div className="card-header mb-4">
              <h4 className="card-title">Part Thumbnail </h4>
            </div>
            <div
              className="col-sm-12"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <label className="col-form-label">Part Thumbnail</label>
              <div className="uploadImageContainer" style={styles.container}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  style={{ display: "none" }}
                  id="logoUpload"
                />
                {logo ? (
                  <>
                    <div style={styles.deleteIcon} onClick={handleDeleteLogo}>
                      ⛌
                    </div>
                    <img className='img' src={logo} alt="Logo" style={styles.img} />
                  </>
                ) : (
                  <label className="imgPlaceholder" htmlFor="logoUpload" style={styles.placeholder}>
                    <div
                      style={styles.uploadIcon}
                      className="flex flex-col cursor-pointer"
                    >
                      <img width="30" src={uplodIcon} alt="Upload Icon"></img>
                      <p>Upload Image</p>
                    </div>
                  </label>
                )}
              </div>
              <p className="mt-2">
                Image format - jpg png jpeg gif
                <br />
                Image Size - maximum size 2 MB
                <br />
                Image Ratio - 1:1
              </p>
              {errors.image && (
                <span className="text-danger fs-12">{errors.image}</span>
              )}
            </div>
          </div>
        </div>

        <div className="col-xl-9 col-lg-9">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Gallery</h4>
            </div>
            <div className="card-body d-flex gap-3">
              <div className="d-flex flex-column align-items-center">
                <div className="uploadImageContainer" style={styles.container}>
                  <label htmlFor="imageUpload" style={{ cursor: "pointer" }}>
                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      multiple
                      style={{display: "none" }}
                      onChange={handleImageChange}
                    />
                    <label htmlFor="imageUpload" style={styles.placeholder}>
                      <div
                        style={styles.uploadIcon}
                        className="flex flex-col cursor-pointer">
                        <img width="30" src={uplodIcon} alt="Upload Icon"></img>
                        <p>Upload Gallery Image</p>
                      </div>
                    </label>
                  </label>
                </div>
                <p className="mt-2">
                  Image format - jpg png jpeg gif
                  <br />
                  Image Size - maximum size 2 MB
                  {/* <br />
                   Image Ratio - 1:1 */}
                </p>
              </div>

              <div className="row"
                style={{ gap: "10px", display: "flex", flexWrap: "wrap" }}>
                {galleryImages?.map((image, index) => (
                  <div
                    key={index}
                    style={{
                      position: "relative",
                      width: "120px",
                      height: "150px",
                      padding: "0px",
                    }}>
                    <div
                      style={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        backgroundColor: "rgba(255, 0, 0, 0.6)",
                        borderRadius: "50%",
                        cursor: "pointer",
                        padding: "3px 6px",
                        color: "white",
                        fontSize: "12px",
                      }}
                      onClick={() => handleDeleteImage(index)}>
                      ⛌
                    </div>
                    <img
                      src={image.url}
                      alt={`Product ${index}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* SECTION 3RD Restaurants & Category Infoo*/}
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">General Info</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <label className="col-sm-4 col-form-label">Category</label>
                  <Select
                    // defaultValue={selectedOption}
                    // value={formData.category}
                    // onChange={handleSelectChange('category')}
                    defaultValue={selectedCategoryOption}
                    // onChange={setSelectedCategoryOption}
                    onChange={handleSelectChange("category")}
                    options={mainCategoryOptions}
                    style={{
                      lineHeight: "40px",
                      color: "#7e7e7e",
                      paddingLeft: " 15px",
                    }}
                  />
                  {errors.category && (
                    <span className="text-danger fs-12">{errors.category}</span>
                  )}
                </div>

                <div className="col-sm-3">
                  <label className="col-sm-4 col-form-label">
                    Sub category
                  </label>
                  <Select
                    // defaultValue={selectedOption}
                    // value={formData.subCategory}
                    // onChange={handleSelectChange('subCategory')}
                    defaultValue={selectedSubCategoryOption}
                    // onChange={setSelectedSubCategoryOption}
                    onChange={handleSelectChange("subCategory")}
                    options={subCategoryOptions}
                    style={{
                      lineHeight: "40px",
                      color: "#7e7e7e",
                      paddingLeft: " 15px",
                    }}
                  />
                  {errors.subCategory && (
                    <span className="text-danger fs-12">
                      {errors.subCategory}
                    </span>
                  )}
                </div>
                <div className="col-sm-3">
                  <label className="col-sm-6 col-form-label">
                    Sub Sub category
                  </label>
                  <Select
                    // defaultValue={selectedOption}
                    // value={formData.subCategory}
                    // onChange={handleSelectChange('subCategory')}
                    defaultValue={selectedSubCategoryOption}
                    // onChange={setSelectedSubCategoryOption}
                    onChange={handleSelectChange("subCategory")}
                    options={subCategoryOptions}
                    style={{
                      lineHeight: "40px",
                      color: "#7e7e7e",
                      paddingLeft: " 15px",
                    }}
                  />
                  {errors.subsubCategory && (
                    <span className="text-danger fs-12">
                      {errors.subsubCategory}
                    </span>
                  )}
                </div>

                <div className="col-sm-3">
                  <label className="col-sm-4 col-form-label">Brand</label>
                  <Select
                    // defaultValue={selectedOption}
                    // value={formData.category}
                    // onChange={handleSelectChange('category')}
                    defaultValue={selectedCategoryOption}
                    // onChange={setSelectedCategoryOption}
                    onChange={handleSelectChange("category")}
                    options={mainCategoryOptions}
                    style={{
                      lineHeight: "40px",
                      color: "#7e7e7e",
                      paddingLeft: " 15px",
                    }}
                  />
                  {errors.category && (
                    <span className="text-danger fs-12">{errors.category}</span>
                  )}
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-sm-3">
                  <label className="col-sm-4 col-form-label">
                    Connection Type
                  </label>
                  <Select
                    // defaultValue={selectedOption}
                    // value={formData.subCategory}
                    // onChange={handleSelectChange('subCategory')}
                    defaultValue={selectedSubCategoryOption}
                    // onChange={setSelectedSubCategoryOption}
                    onChange={handleSelectChange("subCategory")}
                    options={subCategoryOptions}
                    style={{
                      lineHeight: "40px",
                      color: "#7e7e7e",
                      paddingLeft: " 15px",
                    }}
                  />
                  {errors.subCategory && (
                    <span className="text-danger fs-12">
                      {errors.subCategory}
                    </span>
                  )}
                </div>

                <div className="col-sm-3">
                  <label className="col-sm-6 col-form-label">FittingSize</label>
                  <Select
                    // defaultValue={selectedOption}
                    // value={formData.subCategory}
                    // onChange={handleSelectChange('subCategory')}
                    defaultValue={selectedSubCategoryOption}
                    // onChange={setSelectedSubCategoryOption}
                    onChange={handleSelectChange("subCategory")}
                    options={subCategoryOptions}
                    style={{
                      lineHeight: "40px",
                      color: "#7e7e7e",
                      paddingLeft: " 15px",
                    }}
                  />
                  {errors.subsubCategory && (
                    <span className="text-danger fs-12">
                      {errors.subsubCategory}
                    </span>
                  )}
                </div>

                <div className="col-sm-3">
                  <label className="col-sm-6 col-form-label">Material</label>
                  <Select
                    // defaultValue={selectedOption}
                    // value={formData.subCategory}
                    // onChange={handleSelectChange('subCategory')}
                    defaultValue={selectedSubCategoryOption}
                    // onChange={setSelectedSubCategoryOption}
                    onChange={handleSelectChange("subCategory")}
                    options={subCategoryOptions}
                    style={{
                      lineHeight: "40px",
                      color: "#7e7e7e",
                      paddingLeft: " 15px",
                    }}
                  />
                  {errors.subsubCategory && (
                    <span className="text-danger fs-12">
                      {errors.subsubCategory}
                    </span>
                  )}
                </div>

                <div className="col-sm-3 ">
                  <label className="col-sm-6 col-form-label">Variant</label>
                  <Select
                    // defaultValue={selectedOption}
                    // value={formData.subCategory}
                    // onChange={handleSelectChange('subCategory')}
                    defaultValue={selectedSubCategoryOption}
                    // onChange={setSelectedSubCategoryOption}
                    onChange={handleSelectChange("subCategory")}
                    options={subCategoryOptions}
                    style={{
                      lineHeight: "40px",
                      color: "#7e7e7e",
                      paddingLeft: " 15px",
                    }}
                  />
                  {errors.subsubCategory && (
                    <span className="text-danger fs-12">
                      {errors.subsubCategory}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 5th Price Information*/}
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Price Information</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <label className="col-sm-3 col-form-label">Price</label>
                  <input
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    type="number"
                    className="form-control"
                    placeholder="Ex: 100"
                  />
                  {errors.price && (
                    <span className="text-danger fs-12">{errors.price}</span>
                  )}
                </div>

                {/* <div className="col-sm-3">
                  <label className="col-sm-6 col-form-label">
                    Discount type
                  </label>
                  <Select
                    defaultValue={selectedOption}
                    onChange={handleSelectChangeLabel("discountType")}
                    options={discountOptions}
                    style={{
                      lineHeight: "40px",
                      color: "#7e7e7e",
                      paddingLeft: " 15px",
                    }}
                  />
                  {errors.discountType && (
                    <span className="text-danger fs-12">
                      {errors.discountType}
                    </span>
                  )}
                </div>

                <div className="col-sm-3">
                  <label className="col-sm-6 col-form-label">Discount *</label>
                  <input
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    type="number"
                    className="form-control"
                    placeholder="Ex: 100"
                  />
                  {errors.discount && (
                    <span className="text-danger fs-12">{errors.discount}</span>
                  )}
                </div>

                <div className="col-sm-3">
                  <label className="col-sm-12 col-form-label">
                    Maximum Purchase Quantity Limit
                  </label>
                  <input
                    name="maxQuantity"
                    value={formData.maxQuantity}
                    onChange={handleChange}
                    type="number"
                    className="form-control"
                    placeholder="Ex: 100"/>
                   {errors.maxQuantity && (
                    <span className="text-danger fs-12">
                      {errors.maxQuantity}
                    </span>
                   )}
                </div> */}
              </div>
            </div>
          </div>
        </div>