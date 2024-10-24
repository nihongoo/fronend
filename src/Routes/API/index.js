const apiURL = {
    category: {
        base: 'https://localhost:7265/Category/Category/',
        all: 'https://localhost:7265/Category/Get-All-Category/',
        create: 'https://localhost:7265/Category/Create-Category/',
        edit: 'https://localhost:7265/Category/Edit-Category/',
        delete: 'https://localhost:7265/Category/Delete-Category',
        search: 'https://localhost:7265/Category/Search'
    },
    brand: {
        base: 'https://localhost:7265/Brand/Brand/',
        all: 'https://localhost:7265/Brand/Get-All-Brand/',
        create: 'https://localhost:7265/Brand/Create-Brand/',
        edit: 'https://localhost:7265/Brand/Edit-Brand/',
        delete: 'https://localhost:7265/Brand/Delete-Brand',
        search: 'https://localhost:7265/Brand/Search'
    },
    target: {
        base: 'https://localhost:7265/TagetCustomers/TagetCustomers/',
        all: 'https://localhost:7265/TagetCustomers/Get-All-TagetCustomers/',
        create: 'https://localhost:7265/TagetCustomers/Create-TagetCustomers/',
        edit: 'https://localhost:7265/TagetCustomers/Edit-TagetCustomers/',
        delete: 'https://localhost:7265/TagetCustomers/Delete-TagetCustomers',
        search: 'https://localhost:7265/TagetCustomers/Search'
    },
};

export default apiURL;