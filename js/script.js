// M9 Assignment
// Maria Cecilia Schultz

import {loadInitialEmployeeData} from './modules/init.js'


const $ = (id) => document.getElementById(id)

// GET DOM ELEMENTS
let empTable = $('employees')
let empCount = $('empCount') 

// Vars 
let empTotalCount = 0
let employeeData  // this is our employee data object 



// DELETE EMPLOYEE
const deleteEmployeeHandler = (e) => {
    let elementClicked= e.target;  

     if (!elementClicked.classList.contains('delete')) {
        return;
    }

    if (confirm('Are you sure you want to delete this employee record?')) { // confirm proceed with employee deletion
         // get row index for the row clicked
        let rowIdx = elementClicked.parentElement.parentElement.rowIndex;

        empTable.deleteRow(rowIdx) // also from table

        empTotalCount--;
        refreshEmployeeCount()
    }

}


// BUILD THE EMPLOYEES GRID WITH THE EMPLOYEE DATA FROM THE JSON FILE
function buildGrid(data) {
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    empTable.lastElementChild.remove()
    // REBUILD THE TBODY FROM SCRATCH..
    let tbody = document.createElement('tbody')
    
    // .. WITH THE EMPLOYEE DATA OBJECT 
    for (let emp of data.employees) {
        tbody.innerHTML += 
        `
        <tr>
            <td>${emp.empId}</td>
            <td>${emp.name}</td>
            <td>${emp.ext}</td>
            <td><a href="mailto:${emp.email}">${emp.email}</a></td>
            <td>${emp.dept}</td>
            <td><button class="btn btn-sm btn-danger delete">X</button></td>
        </tr>
        `
    }
    // BIND THE TBODY TO THE EMPLOYEE TABLE
    empTable.appendChild(tbody)

    // UPDATE EMPLOYEE COUNT
   empTotalCount= data.employees.length

   refreshEmployeeCount()
}



function viewEmployees(data) {
    buildGrid(data)
}
 
// const sleep = t => new Promise(res => setTimeout(res,t))


// Refresh the Employee count display
function refreshEmployeeCount() {
    empCount.value =empTotalCount
}

function showMenu() {
    console.log('The Asynchronous Loading Employee Management Application')
    console.log('-----------------------------------')
    console.log('COMMAND MENU')
    console.log('show - Show all employees')
    console.log('del - Delete an employee') // this will remove a row from the table 
    console.log('exit - Exit the application')
    console.log('-----------------------------------')
    console.log('')

    let menuCmd = prompt('Enter command (show/del/exit): ')
    return menuCmd
}


function processCommand(commandLetter, data) {
    if (commandLetter === 'show') {
        //viewEmployees(data)
        buildGrid(data)
    } else if (commandLetter === 'del') {
        //deleteEmployee(data)
    } else {
        alert('Please enter a valid command')
    }
}

async function doMain() {
    // load the employee data asynchronuously from the json file
    employeeData = await loadInitialEmployeeData() 

    empTotalCount=employeeData.employees.length

    buildGrid(employeeData)
    
    // The command menu does not really work or make sense. It appears after the prompt is rendered..
    // Also, the deletion will be on a given row, so the command menu does not make sense for this either
    // Delets is handled from the UI.
    // let menuCmd
    // while(true) {
    //     menuCmd = showMenu()
    //     if (menuCmd===null) {
    //         break
    //     }

    //     if (menuCmd==='exit') {
    //         break
    //     }
    //     console.log('will process command..')
    //     processCommand(menuCmd,employeeData)

    // }

}



// WIRE UP EVENT HANDLERS 
window.addEventListener('load', () => {
    empTable.addEventListener('click', deleteEmployeeHandler)
    doMain()
})



