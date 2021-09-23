import React from 'react';

import {Column, DataGrid, Selection} from 'devextreme-react/data-grid';
import SelectBox from 'devextreme-react/select-box';
import './style.css'

export const employees = [{
    'ID': 1,
    'FirstName': 'John',
    'LastName': 'Heart',
    'Prefix': 'Mr.',
    'Position': 'CEO',
    'Picture': 'images/employees/01.png',
    'BirthDate': '1964/03/16',
    'HireDate': '1995/01/15',
    'Notes': 'John has been in the Audio/Video industry since 1990. He has led DevAv as its CEO since 2003.\r\n\r\nWhen not working hard as the CEO, John loves to golf and bowl. He once bowled a perfect game of 300.',
    'Address': '351 S Hill St.'
}, {
    'ID': 20,
    'FirstName': 'Olivia',
    'LastName': 'Peyton',
    'Prefix': 'Mrs.',
    'Position': 'Sales Assistant',
    'Picture': 'images/employees/09.png',
    'BirthDate': '1981/06/03',
    'HireDate': '2012/05/14',
    'Notes': 'Olivia loves to sell. She has been selling DevAV products since 2012. \r\n\r\nOlivia was homecoming queen in high school. She is expecting her first child in 6 months. Good Luck Olivia.',
    'Address': '807 W Paseo Del Mar'
}, {
    'ID': 4,
    'FirstName': 'Robert',
    'LastName': 'Reagan',
    'Prefix': 'Mr.',
    'Position': 'CMO',
    'Picture': 'images/employees/03.png',
    'BirthDate': '1974/09/07',
    'HireDate': '2002/11/08',
    'Notes': 'Robert was recently voted the CMO of the year by CMO Magazine. He is a proud member of the DevAV Management Team.\r\n\r\nRobert is a championship BBQ chef, so when you get the chance ask him for his secret recipe.',
    'Address': '4 Westmoreland Pl.'
}, {
    'ID': 5,
    'FirstName': 'Greta',
    'LastName': 'Sims',
    'Prefix': 'Ms.',
    'Position': 'HR Manager',
    'Picture': 'images/employees/04.png',
    'BirthDate': '1977/11/22',
    'HireDate': '1998/04/23',
    'Notes': 'Greta has been DevAV\'s HR Manager since 2003. She joined DevAV from Sonee Corp.\r\n\r\nGreta is currently training for the NYC marathon. Her best marathon time is 4 hours. Go Greta.',
    'Address': '1700 S Grandview Dr.'
}, {
    'ID': 6,
    'FirstName': 'Brett',
    'LastName': 'Wade',
    'Prefix': 'Mr.',
    'Position': 'IT Manager',
    'Picture': 'images/employees/05.png',
    'BirthDate': '1968/12/01',
    'HireDate': '2009/03/06',
    'Notes': 'Brett came to DevAv from Microsoft and has led our IT department since 2012.\r\n\r\nWhen he is not working hard for DevAV, he coaches Little League (he was a high school pitcher).',
    'Address': '1120 Old Mill Rd.'
}, {
    'ID': 7,
    'FirstName': 'Sandra',
    'LastName': 'Johnson',
    'Prefix': 'Mrs.',
    'Position': 'Controller',
    'Picture': 'images/employees/06.png',
    'BirthDate': '1974/11/15',
    'HireDate': '2005/05/11',
    'Notes': 'Sandra is a CPA and has been our controller since 2008. She loves to interact with staff so if you\'ve not met her, be certain to say hi.\r\n\r\nSandra has 2 daughters both of whom are accomplished gymnasts.',
    'Address': '4600 N Virginia Rd.'
}, {
    'ID': 10,
    'FirstName': 'Kevin',
    'LastName': 'Carter',
    'Prefix': 'Mr.',
    'Position': 'Shipping Manager',
    'Picture': 'images/employees/07.png',
    'BirthDate': '1978/01/09',
    'HireDate': '2009/08/11',
    'Notes': 'Kevin is our hard-working shipping manager and has been helping that department work like clockwork for 18 months.\r\n\r\nWhen not in the office, he is usually on the basketball court playing pick-up games.',
    'Address': '424 N Main St.'
}, {
    'ID': 11,
    'FirstName': 'Cynthia',
    'LastName': 'Stanwick',
    'Prefix': 'Ms.',
    'Position': 'HR Assistant',
    'Picture': 'images/employees/08.png',
    'BirthDate': '1985/06/05',
    'HireDate': '2008/03/24',
    'Notes': 'Cindy joined us in 2008 and has been in the HR department for 2 years. \r\n\r\nShe was recently awarded employee of the month. Way to go Cindy!',
    'Address': '2211 Bonita Dr.'
}, {
    'ID': 30,
    'FirstName': 'Kent',
    'LastName': 'Samuelson',
    'Prefix': 'Dr.',
    'Position': 'Ombudsman',
    'Picture': 'images/employees/02.png',
    'BirthDate': '1972/09/11',
    'HireDate': '2009/04/22',
    'Notes': 'As our ombudsman, Kent is on the front-lines solving customer problems and helping our partners address issues out in the field.    He is a classically trained musician and is a member of the Chamber Orchestra.',
    'Address': '12100 Mora Dr'
}, {
    'ID': 21,
    'FirstName': 'Taylor',
    'LastName': 'Riley',
    'Prefix': 'Mr.',
    'Position': 'Network Admin',
    'Picture': '',
    'BirthDate': '1982/08/14',
    'HireDate': '2012/04/14',
    'Notes': 'If you are like the rest of us at DevAV, then you\'ve probably reached out for help from Taylor. He does a great job as a member of our IT department.',
    'Address': '7776 Torreyson Dr'
}];

class DataGridTable extends React.Component {
    dataGrid: any
    selectionChangedBySelectBox: any
    state: any
    constructor(props: any) {
        super(props);

        this.dataGrid = null;
        this.selectionChangedBySelectBox = false;

        this.state = {
            prefix: '',
            selectedEmployeeNames: 'Nobody has been selected',
            selectedRowKeys: []
        };

        this.onClearButtonClicked = this.onClearButtonClicked.bind(this);
        this.onSelectionChanged = this.onSelectionChanged.bind(this);
        this.onSelectionFilterChanged = this.onSelectionFilterChanged.bind(this);
    }

    render() {
        const { prefix, selectedRowKeys, selectedEmployeeNames} = this.state;

        return (
            <div id="grid">
                <SelectBox
                    id="select-prefix"
                    dataSource={['All', 'Dr.', 'Mr.', 'Mrs.', 'Ms.']}
                    //@ts-ignore
                    onValueChanged={this.onSelectionFilterChanged}
                    placeholder="Select user"
                    value={prefix}
                />{' '}
                <DataGrid
                    id="grid-container"
                    dataSource={employees}
                    keyExpr="ID"
                    onSelectionChanged={this.onSelectionChanged}
                    ref={ref => this.dataGrid = ref}
                    selectedRowKeys={selectedRowKeys}
                    showBorders={true}
                >
                    <Selection mode="multiple" />
                    <Column dataField="Prefix" caption="Title" width={70} />
                    <Column dataField="FirstName" />
                    <Column dataField="LastName" />
                    <Column dataField="Position" width={180} />
                    <Column dataField="BirthDate" dataType="date" width={125} />
                    <Column dataField="HireDate" dataType="date" width={125} />
                </DataGrid>
                <div className="selected-data">
                    <span className="caption">Selected Records:</span>{' '}
                    <span>
            { selectedEmployeeNames }
          </span>
                </div>
            </div>
        );
    }
//@ts-ignore
    onSelectionChanged({ selectedRowKeys, selectedRowsData,}) {
        this.selectionChangedBySelectBox = false;

        this.setState({
            prefix: null,
            selectedEmployeeNames: getEmployeeNames(selectedRowsData),
            selectedRowKeys
        });
    }

    onClearButtonClicked() {
        this.dataGrid.instance.clearSelection();
    }
//@ts-ignore
    async onSelectionFilterChanged({ value }) {
        this.selectionChangedBySelectBox = true;

        let prefix = value;

        if(prefix) {
            let filteredEmployees = prefix === 'All' ? employees : employees.filter(employee => employee.Prefix === prefix);

            const selectedRowKeys = filteredEmployees.map(employee => employee.ID);
            const selectedRowsData = await this.dataGrid.instance.getDataByKeys(selectedRowKeys);

            this.setState({
                prefix,
                selectedRowKeys,
                selectedEmployeeNames: getEmployeeNames(selectedRowsData)
            });
        }
    }
}

function getEmployeeName(row: any) {
    return `${row.FirstName} ${row.LastName}`;
}

function getEmployeeNames(selectedRowsData: any) {
    return selectedRowsData.length ? selectedRowsData.map(getEmployeeName).join(', ') : 'Nobody has been selected';
}

export default DataGridTable;