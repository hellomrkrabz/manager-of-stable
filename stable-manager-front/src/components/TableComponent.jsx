import React from 'react';

const TableComponent = () => {
    // Sample data for the table
    const data = [
        { id: 1, name: 'John Doe', age: 25 },
        { id: 2, name: 'Jane Smith', age: 30 },
        { id: 3, name: 'Bob Johnson', age: 22 },
    ];

    return (
        <div>
            <h2>Simple Table</h2>
            <table border="1">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                </tr>
                </thead>
                <tbody>
                {data.map((row) => (
                    <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.name}</td>
                        <td>{row.age}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;