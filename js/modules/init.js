async function loadInitialEmployeeData() {
    try {
        const resp= await fetch('../data/employees.json')
        const data = await resp.json()
        return data
    } catch(e) {
        console.error('##An error has occurred:',e)
    }

}

export { loadInitialEmployeeData }