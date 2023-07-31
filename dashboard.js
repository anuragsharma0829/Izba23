const userData = localStorage.getItem("userData");
const data = JSON.parse(userData);
const objID = data.objectId;
const token = data.token;
let UserBrandID;
const script = document.createElement("script");
script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js";
document.head.appendChild(script);

$("#loginBtn").hide();
$("#UserNameBlock").show();
$("#GetStartedButton").hide();
$("#LogOutButton").show();

document.getElementById("UserNameText").innerHTML = data.first_name;

// cheak brand
$(document).ready(function () {
    // Fetch user data from localStorage for session management
    const userData = localStorage.getItem("userData");
    if (userData) {
        const data = JSON.parse(userData);
        // Check the custom API for validation
        $.ajax({
            url: "https://cleanstation.backendless.app/api/services/Brand/CheakBrand",
            type: "POST",
            data: JSON.stringify({ objectId: data.objectId }), // Get the objectId from localStorage
            contentType: "application/json; charset=UTF-8",
            dataType: "json",
            success: function (response) {
                console.log("API response:", response);

                if (response === true) {
                    // Show #BrandHeroSection and hide #CreateBrandSection
                    $("#MainSection").show();
                    $("#CreateBrandSection").hide();
                } else {
                    // Show #CreateBrandSection and hide #BrandHeroSection
                    $("#MainSection").hide();
                    $("#CreateBrandSection").show();
                }
            },
            error: function (error) {
                console.log(error);
                // Handle API error for user validation if necessary
                // Optionally, show an error message to the user
                console.log("Error: User validation failed. Please try again later.");
                // You can add an error message on the page if needed
            },
        });
    }
});

$(document).ready(function () {
    $("#AddFulfillmentContractButton").click(function () {
        $("#Wrapper").hide();
        $("#CreateFulfillmentContractBlock").show();
    });
});

$(document).ready(function () {
    $("#CancelCreateFulfillmentContract").click(function () {
        $("#CreateFulfillmentContractBlock").hide();
        $("#Wrapper").show();
    });
});

$(document).ready(function () {
    $("#FulfillmentContractEditButton").click(function () {
        $("#Wrapper").hide();
        $("#UpdateFulfillmentContractSection").show();
    });
});

$(document).ready(function () {
    $("#FCDetail").click(function () {
        $("#Wrapper").hide();
        $("#FulfillmentContractDetailSection").show();
    });
});

$(document).ready(function () {
    $("#CancelCreateContractButton").click(function () {
        $("#fulfillmentContractSection").hide();
        $("#Wrapper").show();
    });
});


$(document).ready(function () {
    $("#BrandTab").click(function () {
        $("#CreateFulfillmentContractBlock").hide();
        $("#fulfillmentContractSection").hide();
        $("#UpdateFulfillmentContractSection").hide();
        $("#FulfillmentContractDetailSection").hide();
        $("#Wrapper").show();
        $("#FcContractList").show();

    });
});

// create Brand
function showError(elementId, message) {
    const errorElement = $(elementId);
    errorElement.text(message).css({ color: "red", display: "block" });
}

function hideError(elementId) {
    const errorElement = $(elementId);
    errorElement.text("").css({ display: "none" });
}

function showGenericError() {
    showError("#errorContainer", "Please fill out all the required fields.");
}

$(document).ready(function () {
    $("#Brand-Name").on("input", function () {
        let BrandName = $("#Brand-Name").val();
        if (!BrandName) {
            showError("#brandNameError", "Brand name should not be blank");
        } else {
            hideError("#brandNameError");
        }
    });

    $("#Brand-URl").on("input", function () {
        let BrandURl = $("#Brand-URl").val();
        if (!BrandURl) {
            showError("#Brand-URlerror", "Last Name should not be blank");
        } else {
            hideError("#Brand-URlerror");
        }
    });

    $("#Brand-URl").on("input", function () {
        let ShoppingCartDropDown = $("#ShoppingCartDropDown").val();
        if (!ShoppingCartDropDown) {
            showError("#ShoppingCartDropDown", "Last Name should not be blank");
        } else {
            hideError("#ShoppingCartDropDown");
        }
    });

    $("#CreateBrandButton").click(function () {
        let BrandName = $("#Brand-Name").val();
        let BrandURl = $("#Brand-URl").val();
        let ShoppingCartDropDown = $("#ShoppingCartDropDown").val();
        let userobjId = objID;
        console.log("<<<<<<", userobjId);
        // let fcConatainer = $("#centers").val();
        // const errorElement = document.getElementById("errBrand");

        if (BrandName !== "" && BrandURl !== "" && ShoppingCartDropDown !== "") {
            let brandDetail = {
                brand_name: BrandName,
                URL: BrandURl,
                Cart: ShoppingCartDropDown,
                User_ID: {
                    objectId: userobjId,
                },
            };

            fetch(
                "https://cleanstation.backendless.app/api/services/Brand/CreateBrand",
                {
                    method: "POST",
                    body: JSON.stringify(brandDetail),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    console.log("hhhhhhh", data);
                    const BrandMessage = document.getElementById("BrandMessage");
                    BrandMessage.innerHTML = "Brand created successfully";
                    BrandMessage.style.color = "white";
                    BrandMessage.style.backgroundColor = "green";
                    BrandMessage.style.display = "block";
                    $("#MainSection").show();
                    $("#CreateBrandSection").hide();
                    document.getElementById("Brand-URl-Text").innerHTML = data.URL;
                    document.getElementById("BrandNameText").innerHTML = data.brand_name;
                })
                .catch((error) => console.error("Error:", error));
        } else {
            showGenericError();
            const BrandMessage = document.getElementById("BrandMessage");
            BrandMessage.innerHTML = "Something went wrong ! please try agian ";
            BrandMessage.style.color = "white";
            BrandMessage.style.backgroundColor = "red";
            BrandMessage.style.display = "block";
        }
        return false;
    });
});

//set brand and url
let BrandID = {
    objectId: objID,
};
fetch("https://cleanstation.backendless.app/api/services/Brand/UserIDToBrand", {
    method: "POST",
    body: JSON.stringify(BrandID),
    headers: {
        "Content-type": "application/json; charset=UTF-8",
    },
})
    .then((response) => response.json())
    .then((data) => {
        console.log("API Response:", data); // Log the API response to check its structure
        // Access the first object in the array
        const brandData = data;
        UserBrandID = brandData.objectId;
        console.log((UserBrandID, "<<<<<<<"));
        document.getElementById("Brand-URl-Text").innerHTML = brandData.URL;
        document.getElementById("BrandNameText").innerHTML = brandData.brand_name;
    })
    .catch((error) => console.error("Error fetching data:", error));

$(document).ready(function () {
    $("#LogOutButton").click(function () {
        localStorage.removeItem("userData");
        const redirectUrl = "https://izba-exchange.webflow.io/log-in";
        window.location.href = redirectUrl;
    });
});

// Global variables for pagination
let currentPage = 1;
const rowsPerPage = 5;
let totalRows = 0;
let totalPages = 1;
let currentContractId = null;
// Function to fetch and show contracts
function fetchAndShowContracts() {
    let userobjId = {
        objectId: objID,
    };

    fetch("https://cleanstation.backendless.app/api/services/Brand/BrandContract", {
        method: "POST",
        body: JSON.stringify(userobjId),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.length > 0) {
                // Filter out contracts with null Contract_name
                const contracts = data.filter(
                    (contract) =>
                        contract.Contract_name !== null && contract.Contract_name.trim() !== ""
                );
                totalRows = contracts.length;
                totalPages = Math.ceil(totalRows / rowsPerPage);

                const startIndex = (currentPage - 1) * rowsPerPage;
                const endIndex = startIndex + rowsPerPage;
                const contractsToShow = contracts.slice(startIndex, endIndex);

                const cardTableBody = document.getElementById("cardTableBody");
                cardTableBody.innerHTML = ""; // Clear existing rows

                if (contractsToShow.length > 0) {
                    contractsToShow.forEach((contract, index) => {
                        const row = document.createElement("tr");
                        row.innerHTML = `
                <td style="padding: 8px; border-bottom: 1px solid #ccc;">${startIndex + index + 1}</td>
                <td style="padding: 8px; border-bottom: 1px solid #ccc;">
                  <span class="contract-name" data-contract-id="${contract.objectId}">
                    ${contract.Contract_name}
                  </span>
                </td>
                <td style="padding: 8px; border-bottom: 1px solid #ccc;">
                  <div class="button-container">
                  
                  <span class="edit-btn glyphicon glyphicon-pencil" onclick="editContract('${contract.objectId}')"></span>
                  <span class="delete-btn glyphicon glyphicon-trash" onclick="deleteContract('${contract.objectId}')"></span>


                  </div>
                </td>
              `;
                        cardTableBody.appendChild(row);
                    });
                } else {
                    // Show "No contract data found" message in the custom alert row
                    const alertRow = document.getElementById("alertRow");
                    alertRow.style.display = "table-row";
                }

                // Update the pagination information
                const currentPageSpan = document.getElementById("currentPage");
                const totalPagesSpan = document.getElementById("totalPages");
                currentPageSpan.textContent = currentPage;
                totalPagesSpan.textContent = totalPages;

                // Add event listener to Contract Name cells
                const contractNameCells = document.querySelectorAll(".contract-name");
                contractNameCells.forEach((cell) => {
                    cell.addEventListener("click", () => {
                        const contractId = cell.dataset.contractId;
                        currentContractId = contractId;
                        localStorage.setItem("contactID", contractId)
                        // Fetch and show contract details for the clicked contract
                        fetchAndShowContractDetails(contractId);
                    });
                });
            } else {
                // If no data is returned from the API
                const alertRow = document.getElementById("alertRow");
                alertRow.style.display = "table-row";
            }
        })
        .catch((error) => console.error("Error fetching data:", error));
}

// Function to fetch and show contract details
function fetchAndShowContractDetails(contractId) {
    let contractDetails = {
        objectId: contractId,
    };

    fetch("https://cleanstation.backendless.app/api/services/FulfilmentContract/IDToContractDetail", {
        method: "POST",
        body: JSON.stringify(contractDetails),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            // Set the data in the contract details section
            $("#fcNameContract").text(data.Contract_name);
            $("#fcNameTextt").text(data.Contract_name);
            $("#startDateTextt").text(data.Start_Date);
            $("#endDateTextt").text(data.End_Date);
            $("#daysDifference").text(data.Days_Difference);
            $("#brandNameText").text(data.Brand_Name);
            $("#addPickFeetext").text(data.Additional_Pick_Fee);
            $("#perKitFeetxt").text(data.Additional_Pick_Kit);
            $("#baseReturnTextt").text(data.Base_Per_Return_Fee);
            $("#palletFeeText").text(data.Storage_Per_Pallet);
            $("#shelfFeetext").text(data.Storage_Per_Shelf);
            $("#binfeeTextt").text(data.Storage_Per_Bin);
            $("#palletReceiptfeetext").text(data.Receipt_Per_Pallet_Fee);
            $("#caseReceiptfeetxt").text(data.Receipt_Per_Case_Fee);
            $("#whousetxt").text(data.Labor_Warehouse_Rate);
            $("#otText").text(data.Labor_OT_Rate);
            $("#itText").text(data.Labor_IT_Rate);
            $("#managmentText").text(data.Management_Fee);
            $("#minimumfeeTextt").text(data.Minimum_Fee);
            $("#Menifesttext").text(data.Manifest_Fee);
            $("#internationltext").text(data.International_Surcharge_Fee);

            // Show the contract details section
            $("#FulfillmentContractDetailSection").show();
            $("#FcContractList").hide();
        })
        .catch((error) => console.error("Error fetching contract details:", error));






    //   show rate cards 

    // Global variables
    let rateCurrentPage = 1;
    const rateItemsPerPage = 5; // You can change the number of items per page here

    // Function to fetch data from API
    async function fetchRateData() {
        const response = await fetch('https://cleanstation.backendless.app/api/services/FulfilmentContract/IDToRateCard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "objectId": contractId
            })
        });

        const data = await response.json();
        return data;
    }

    // Function to render the table
    async function renderRateTable(page) {
        const data = await fetchRateData();

        if (data.length === 0) {
            // Show the "No rate card for this contact" message if no data is available
            document.getElementById('rate-table-body').innerHTML = '';
            document.getElementById('rate-pagination').innerHTML = '';
            document.getElementById('rate-no-data-message').style.display = 'block';
            return;
        }

        const startIndex = (page - 1) * rateItemsPerPage;
        const endIndex = startIndex + rateItemsPerPage;
        const paginatedData = data.slice(startIndex, endIndex);

        document.getElementById('rate-no-data-message').style.display = 'none';

        const tableBody = document.getElementById('rate-table-body');
        tableBody.innerHTML = paginatedData.map(item => {

            $("#addRetecard").click(function () {
                if (currentContractId) {
                    console.log("Contract ID for the clicked button:", currentContractId);
                    // Construct the redirect URL with the object ID as a query parameter
                    const redirectUrl = "https://izba-exchange.webflow.io/rate-card?object_id=" + currentContractId;
                    // Perform the redirect using window.location.href
                    window.location.href = redirectUrl;
                } else {
                    console.log("No contract ID available for the clicked button.");
                }
            });

            const brandContract = item.Brand_Contract ? '<span class="yes">Yes</span>' : '<span class="no">No</span>';
            return `
                    <tr>
                        <td>${item.Rate_Card_Name}</td>
                        <td>${item.Carrier_Type}</td>
                        <td>${brandContract}</td>
                        <td>${new Date(item.created).toLocaleString()}</td>
                        <td>
                            <span class="edit-btn glyphicon glyphicon-pencil" onclick="handleRateEdit('${item.objectId}')"></span>
                            <span class="delete-btn glyphicon glyphicon-trash" onclick="handleRateDelete('${item.objectId}')"></span>
                        </td>
                    </tr>
                `;
        }).join('');

        renderRatePagination(data.length);



    }

    // Function to render pagination
    function renderRatePagination(totalItems) {
        const totalPages = Math.ceil(totalItems / rateItemsPerPage);
        const paginationElement = document.getElementById('rate-pagination');

        let paginationHtml = `
                <li${rateCurrentPage === 1 ? ' class="disabled"' : ''}>
                    <a href="#" aria-label="Previous" onclick="prevRatePage()">
                        <span aria-hidden="true">&laquo; Previous</span>
                    </a>
                </li>
            `;
        for (let i = 1; i <= totalPages; i++) {
            paginationHtml += `<li${rateCurrentPage === i ? ' class="active"' : ''}><a href="#" onclick="changeRatePage(${i})">${i}</a></li>`;
        }
        paginationHtml += `
                <li${rateCurrentPage === totalPages ? ' class="disabled"' : ''}>
                    <a href="#" aria-label="Next" onclick="nextRatePage()">
                        <span aria-hidden="true">Next &raquo;</span>
                    </a>
                </li>
            `;
        paginationElement.innerHTML = paginationHtml;
    }

    // Function to change to the previous page
    function prevRatePage() {
        if (rateCurrentPage > 1) {
            rateCurrentPage--;
            renderRateTable(rateCurrentPage);
        }
    }

    // Function to change to the next page
    function nextRatePage() {
        const totalPages = Math.ceil(fetchRateData.length / rateItemsPerPage);
        if (rateCurrentPage < totalPages) {
            rateCurrentPage++;
            renderRateTable(rateCurrentPage);
        }
    }

    // Function to handle Edit button click


    // Initialize the table on page load
    renderRateTable(rateCurrentPage);

    // end here






}

// Trigger the fetchAndShowContracts function when needed, e.g., on button click
$("#fetchContractsButton").click(function () {
    fetchAndShowContracts();
});

// Edit fullfillment contract 

function editContract(contractId) {

    console.log(contractId);
    const apiUrl = "https://cleanstation.backendless.app/api/services/FulfilmentContract/IDToContractDetail";

    // Create the request body with the contractId
    const requestBody = {
        objectId: contractId,
    };

    // Fetch data from the API
    fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            // Data is retrieved successfully, now set the values in the form
            $("#fcnameforupdate").val(data.Contract_name);
            $("#centers").val(localStorage.getItem("selectedCenterName"));
            $("#upstartDate").val(data.Start_Date);
            $("#upendDate").val(data.End_Date);
            // $("#uptotal-Days").val(data.DaysDifference);
            $("#updateBaseorderfee").val(data.Base_Per_Order_Fee);
            $("#updateAddfee").val(data.Additional_Pick_Fee);
            $("#updateBaseReturnrfee").val(data.Base_Per_Return_Fee);
            $("#updatePerKitfee").val(data.Additional_Pick_Kit);
            // $("#UptoggleID").val(data.toggleID);
            $("#updatepalletfee").val(data.Storage_Per_Pallet);
            $("#updateShelfrfee").val(data.Storage_Per_Shelf);
            $("#updateBinrfee").val(data.Storage_Per_Bin);
            $("#updateReceiptRate").val(data.Receipt_Per_Case_Fee);
            $("#updateCasereceiptrate").val(data.Receipt_Per_Pallet_Fee);
            $("#updateWHlabor").val(data.Labor_Warehouse_Rate);
            $("#updateOtrate").val(data.Labor_OT_Rate);
            $("#updateItRate").val(data.Labor_IT_Rate);
            $("#updateManagmentfee").val(data.Management_Fee);
            $("#updateMinimumfee").val(data.Minimum_Fee);
            $("#updateManifestfee").val(data.Manifest_Fee);
            $("#updateINTfee").val(data.International_Surcharge_Fee);

            // Show the update form section
            $("#UpdateFulfillmentContractSection").show();
            $("#FcContractList").hide();

            // Attach the event listener to the #UpdateContractRateButton inside the editContract function
            $("#UpdateContractRateButton").click(function () {
                // Get the updated data from the form fields
                const Contract_name = $("#fcnameforupdate").val();
                const Labor_Warehouse_Rate = $("#updateWHlabor").val();
                const Storage_Per_Pallet = $("#updatepalletfee").val();
                const Base_Per_Return_Fee = $("#updateBaseReturnrfee").val();
                const End_Date = $("#upendDate").val();
                const Start_Date = $("#upstartDate").val();
                const storagePerBin = $("#updateBinrfee").val();
                const International_Surcharge_Fee = $("#updateINTfee").val();
                const Minimum_Fee = $("#updateMinimumfee").val();
                const Management_Fee = $("#updateManagmentfee").val();
                const Base_Per_Order_Fee = $("#updateBaseorderfee").val();
                const Manifest_Fee = $("#updateManifestfee").val();
                const Labor_IT_Rate = $("#updateItRate").val();
                const Labor_OT_Rate = $("#updateOtrate").val();
                const additionalPickfee = $("#updateAddfee").val();
                const Receipt_Per_Case_Fee = $("#updateReceiptRate").val();
                const Storage_Per_Shelf = $("#updateShelfrfee").val();
                const Additional_Pick_Kit = $("#updatePerKitfee").val();
                const Receipt_Per_Pallet_Fee = $("#updateCasereceiptrate").val();
                // ... and so on for other fields ...

                // Create the request body for the update API
                const requestBody = {
                    Fulfillment_Contract_ID: {
                        objectId: contractId,
                    },
                    Fulfillment_Center_ID: {
                        objectId: localStorage.getItem("selectedCenterId")
                    },
                    Contract_name: Contract_name,
                    Labor_Warehouse_Rate: Labor_Warehouse_Rate,
                    Storage_Per_Pallet: Storage_Per_Pallet,
                    Storage_Type: true,
                    Base_Per_Return_Fee: Base_Per_Return_Fee,
                    End_Date: End_Date,
                    Labor_OT_Rate: Labor_OT_Rate,
                    Storage_Per_Bin: storagePerBin,
                    International_Surcharge_Fee: International_Surcharge_Fee,
                    Minimum_Fee: Minimum_Fee,
                    Management_Fee: Management_Fee,
                    Base_Per_Order_Fee: Base_Per_Order_Fee,
                    Start_Date: Start_Date,
                    Manifest_Fee: Manifest_Fee,
                    Labor_IT_Rate: Labor_IT_Rate,
                    Additional_Pick_Fee: additionalPickfee,
                    Receipt_Per_Case_Fee: Receipt_Per_Case_Fee,
                    Storage_Per_Shelf: Storage_Per_Shelf,
                    Additional_Pick_Kit: Additional_Pick_Kit,
                    Receipt_Per_Pallet_Fee: Receipt_Per_Pallet_Fee,
                };

                // Make the PUT request to update the contract
                fetch("https://cleanstation.backendless.app/api/services/FulfilmentContract/Update", {
                    method: "PUT",
                    body: JSON.stringify(requestBody),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        // Contract updated successfully, show the success message
                        Swal.fire("Success", "Contract updated successfully", "success");
                        // Optionally, you can also hide the update form section after the update
                        $("#UpdateFulfillmentContractSection").hide();
                    })
                    .catch((error) => {
                        console.error("Error updating contract:", error);
                        Swal.fire("Error", "An error occurred while updating the contract", "error");
                    });
            });
        })
        .catch((error) => console.error("Error fetching data:", error));
}

// Delete Fullfillment Contract 
function deleteContract(contractId) {
    Swal.fire({
        icon: "info",
        title: "Are You sure",
        confirmButtonText: "Delete",
        showCancelButton: true,
    }).then((result) => {
        if (result.isConfirmed) {
            // Delete
            // If user confirms the deletion, proceed with the actual deletion
            const deleteObj = {
                objectId: contractId,
            };

            fetch(
                "https://cleanstation.backendless.app/api/services/FulfilmentContract/IDToDelete",
                {
                    method: "DELETE",
                    body: JSON.stringify(deleteObj),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    console.log("API Response for delete:", data);
                    Swal.fire("Success", "Contract Delete SuccessFully", "success");
                    fetchAndShowContracts();
                })
                .catch((error) => console.error("Error deleting contract:", error));
            fetchAndShowContracts();
        }
    });
}

// update and delete rateCards 
function handleRateEdit(objectId) {
    alert(`Edit data with objectId: ${objectId}`);
}

// Function to handle Delete button click
function handleRateDelete(objectId) {
    Swal.fire({
        icon: "info",
        title: "Are You sure",
        confirmButtonText: "Delete",
        showCancelButton: true,
    }).then((result) => {
        if (result.isConfirmed) {
            // Delete
            // If user confirms the deletion, proceed with the actual deletion
            const deleteRateObj = {
                objectId: objectId,
            };

            fetch(
                "https://cleanstation.backendless.app/api/services/ZoneRateCard/Rate_Card_Delete",
                {
                    method: "DELETE",
                    body: JSON.stringify(deleteRateObj),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    Swal.fire("Success", "Contract Delete SuccessFully", "success");
                    fetchAndShowContracts();
                })
                .catch((error) => console.error("Error deleting contract:", error));
            fetchAndShowContracts();
            fetchRateData();
        }
    });
}







// Call fetchAndShowContracts initially to populate the table
fetchAndShowContracts();

// Call fetchAndShowContracts every 10 seconds (adjust the interval as needed)
setInterval(fetchAndShowContracts, 10000); // 10000 milliseconds = 10 seconds

// Pagination functions
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        fetchAndShowContracts();
    }
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        fetchAndShowContracts();
    }
}

function goToPage(pageNumber) {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
        currentPage = pageNumber;
        fetchAndShowContracts();
    }
}

function updatePagination() {
    const paginationSection = document.getElementById("paginationSection");
    paginationSection.innerHTML = "";

    const prevButton = document.createElement("button");
    prevButton.textContent = "Previous";
    prevButton.onclick = prevPage;

    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.onclick = nextPage;

    paginationSection.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.onclick = () => goToPage(i);
        paginationSection.appendChild(pageButton);
    }

    paginationSection.appendChild(nextButton);
}


// Add fullfillment Contract 
$(document).ready(function () {
    $("#CreateContractRatesBtn").click(function () {
        let cName = $("#cName").val().trim();
        let centers = $("#centers").val().trim();
        let startDate = $("#startDate").val().trim();
        let endDate = $("#endDate").val().trim();

        console.log("cName:", cName);
        console.log("centers:", centers);
        console.log("startDate:", startDate);
        console.log("endDate:", endDate);

        if (cName === "" || centers === "" || startDate === "" || endDate === "") {
            // Show the common error message for all required fields
            const startDateEndDate = document.getElementById("startDate-EndDate");
            startDateEndDate.textContent = "Please fill all required fields"; // Set the error message text
            startDateEndDate.style.color = "red"; // Set the color to red
            startDateEndDate.style.display = "block";
        } else {
            // Hide the common error message if all fields are filled
            const startDateEndDate = document.getElementById("startDate-EndDate");
            startDateEndDate.style.display = "none";

            // Set values in the fulfillmentContractSection
            $("#ContractNameText").text(cName);
            $("#startDateText").text(startDate);
            $("#endDateText").text(endDate);
            $("#fcNameText").text(localStorage.getItem("selectedCenterName"));

            // Hide #CreateFulfillmentContractBlock and show #fulfillmentContractSection and #contractsReatessection
            $("#CreateFulfillmentContractBlock").hide();
            $("#fulfillmentContractSection").show();
            $("#contractsReatessection").show();
        }
    });
});

$(document).ready(function () {
    let fcobjId;
    console.log("ommmm", fcobjId);
    $("#CreateContractRateButton").click(function () {
        // contract details
        let Contract_name = $("#ContractNameText").text().trim();
        let Start_Date = $("#startDateText").text().trim();
        let End_Date = $("#endDateText").text().trim();
        let centeName = localStorage.getItem("selectedCenterId");

        // pick and pack
        let Baseorderfee = $("#Baseorderfee").val().trim();
        let additionalPickfee = $("#additionalPickfee").val().trim();
        let BaseReturnFee = $("#BaseReturnFee").val().trim();
        let PerKitFee = $("#PerKitFee").val().trim();
        // Storage
        let toggleID = $("#toggleID").val().trim();
        console.log("heloooo", toggleID);
        let PalletFee = $("#PalletFee").val().trim();
        let SelfFee = $("#SelfFee").val().trim();
        let BinFee = $("#BinFee").val().trim();
        // Reviving
        let palletReciiptRate = $("#palletReciiptRate").val().trim();
        let CaseRecipRate = $("#CaseRecipRate").val().trim();
        // labor
        let WHlabor = $("#WHlabor").val().trim();
        let laborOtrate = $("#laborOtrate").val().trim();
        let laborItrate = $("#laborItrate").val().trim();
        // Managment
        let ManagmentFee = $("#ManagmentFee").val().trim();
        let MinimumFee = $("#MinimumFee").val().trim();
        // parcel
        let ParcelManifesFee = $("#ParcelManifesFee").val().trim();
        let internationalFee = $("#internationalFee").val().trim();

        let postContract = {
            Fulfillment_Center: {
                objectId: centeName,
            },
            User_ID: {
                objectId: objID,
            },
            Start_Date: Start_Date,
            End_Date: End_Date,
            Base_Per_Order_Fee: Baseorderfee,
            Additional_Pick_Fee: additionalPickfee,
            Additional_Pick_Kit: PerKitFee,
            Base_Per_Return_Fee: BaseReturnFee,
            Storage_Type: true,
            Storage_Per_Pallet: PalletFee,
            Storage_Per_Shelf: SelfFee,
            Storage_Per_Bin: BinFee,
            Receipt_Per_Case_Fee: CaseRecipRate,
            Receipt_Per_Pallet_Fee: palletReciiptRate,
            Management_Fee: ManagmentFee,
            Minimum_Fee: MinimumFee,
            Labor_Warehouse_Rate: WHlabor,
            Labor_OT_Rate: laborOtrate,
            Labor_IT_Rate: laborItrate,
            Contract_name: Contract_name,
            Manifest_Fee: ParcelManifesFee,
            International_Surcharge_Fee: internationalFee,
        };

        fetch(
            "https://cleanstation.backendless.app/api/services/FulfilmentContract/CreateContract",
            {
                method: "POST",
                body: JSON.stringify(postContract),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                console.log("Paras API done total", data);
                fcobjId = data.objectId;
                hndlFcId(fcobjId);
                Swal.fire("Success", "Contract Created Successfully", "success");
                $("#FulfillmentContractDetailSection").show();
                $("#fulfillmentContractSection").hide();
                $("#CreateFulfillmentContractBlock").hide();
            })
            .catch((error) => {
                console.error("Error:", error);
                Swal.fire("Error", error, "error");
            });
    });
});
function hndlFcId(id) {
    let fullfillmentId = {
        objectId: id,
    };
    fetch(
        "https://cleanstation.backendless.app/api/services/FulfilmentContract/IDToContractDetail",
        {
            method: "POST",
            body: JSON.stringify(fullfillmentId),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }
    )
        .then((response) => response.json())
        .then((data) => {
            console.log("API Response:", data); // Log the API response to check its structure
            // Access the first object in the array
            console.log((data, "<<<ggggg<<<<"));
            const startDatee = new Date(data.Start_Date);
            const endDatee = new Date(data.End_Date);

            document.getElementById(
                "startDateTextt"
            ).innerHTML = `${startDatee.getDate()}/${startDatee.getMonth() + 1
                }/${startDatee.getFullYear()}`;
            document.getElementById(
                "endDateTextt"
            ).innerHTML = `${endDatee.getDate()}/${endDatee.getMonth() + 1
                }/${endDatee.getFullYear()}`;

            const timeDifference = endDatee.getTime() - startDatee.getTime();
            // Convert the time difference to days
            const daysDifference = timeDifference / (1000 * 3600 * 24);
            document.getElementById("daysDifference").innerHTML = daysDifference;

            document.getElementById("managmentText").innerHTML =
                "$" + data.Management_Fee;
            document.getElementById("minimumfeeTextt").innerHTML =
                "$" + data.Minimum_Fee;
            document.getElementById("whousetxt").innerHTML =
                "$" + data.Labor_Warehouse_Rate;
            document.getElementById("otText").innerHTML = "$" + data.Labor_OT_Rate;
            document.getElementById("itText").innerHTML = "$" + data.Labor_IT_Rate;
            document.getElementById("baseorderfeeTextt").innerHTML =
                "$" + data.Base_Per_Order_Fee;
            document.getElementById("addPickFeetext").innerHTML =
                "$" + data.Additional_Pick_Fee;
            document.getElementById("baseReturnTextt").innerHTML =
                "$" + data.Base_Per_Return_Fee;
            document.getElementById("perKitFeetxt").innerHTML =
                "$" + data.Additional_Pick_Kit;
            document.getElementById("binfeeTextt").innerHTML =
                "$" + data.Storage_Per_Bin;
            document.getElementById("shelfFeetext").innerHTML =
                "$" + data.Storage_Per_Shelf;
            document.getElementById("palletFeeText").innerHTML =
                "$" + data.Storage_Per_Pallet;
            document.getElementById("palletReceiptfeetext").innerHTML =
                "$" + data.Receipt_Per_Pallet_Fee;
            document.getElementById("caseReceiptfeetxt").innerHTML =
                "$" + data.Receipt_Per_Case_Fee;
            document.getElementById("fcNameContract").innerHTML =
                 data.Contract_name;

            document.getElementById("fcNameTextt").innerHTML =
                 localStorage.getItem("selectedCenterName");
            document.getElementById("Menifesttext").innerHTML =
                "$" + data.Manifest_Fee;
            document.getElementById("internationltext").innerHTML =
                "$" + data.International_Surcharge_Fee;
        })
        .catch((error) => console.error("Error fetching data:", error));
}