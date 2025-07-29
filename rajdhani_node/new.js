   {`
        #smartwizard .nav li:last-child .nav-link::after {
          display: none !important;
        }

        /* Base style for the last tab */
        #smartwizard .nav li:last-child .nav-link {
          border-top-right-radius: 6px;
          border-bottom-right-radius: 6px;
          margin-right: 0;
          background: #f8f9fa;
          color: #b0b0b1;
          font-weight: bold;
          transition: backgorund 0.3s ease;
        }

        /* Active style ONLY for the last tab */
        #smartwizard .nav li:last-child .nav-link.active {
          background-color: #019ef7 !important;
          /* Darker shade of #90d4fa */
          color: #fff !important;
          font-weight: bold;
        }




        last in tab
            <style>
  {`
    /* Remove the arrow on the last tab */
    #smartwizard .nav li:last-child .nav-link::after {
      display: none !important;
    }

    /* Base style for the last tab */
    #smartwizard .nav li:last-child .nav-link {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
      margin-right: 0;
      background: #90d4fa;
      color: white;
      font-weight: bold;
      transition: background 0.3s ease;
    }

    /* Active style ONLY for the last tab */
    #smartwizard .nav li:last-child .nav-link.active {
      background-color: #019ef7 !important; /* Darker shade of #90d4fa */
      color: #fff !important;
      font-weight: bold;
    }
  `}
</style>
