// TODO Update
import data from './mock/mock-data';

import conf from './src/conf/conf';

import { getColumns, jsonPrintFunction, ucwords } from './src/js';
import { useColumns, useData, useDataGrid, usePages } from './src/hooks';

// import Promises from './src/lib/Promises';

// import { Show, Text } from '@fantaptik/react-material';

import Buttons from './src/components/Buttons/Buttons';
import ColumnOrder from './src/components/ColumnOrder/ColumnOrder';
import Grid from './src/components/Grid/Grid';
import Labels from './src/components/Labels/Labels';
import Page from './src/components/Page/Page';
import PerPage from './src/components/PerPage/PerPage';
import Rows from './src/components/Rows/Rows';
import SampleRow from './src/components/SampleRow/SampleRow';

// import ChangePassword from './src/forms/ChangePassword/ChangePassword';
// import Login from './src/forms/Login/Login';

global.dataSample = {
    id              : 999999,
    first_name      : "123456780123456780123456780",
    last_name       : "123456780123456780123456780",
    birthday        : "05/26/1999",
    email           : "123456780123456780123456780",
    gender          : "123456780123456780",
    married         : false,
    country         : "IT",
    state           : "AB",
    city            : "123456780123456780",
    postal          : "99999-9999",
    address         : "34 Meadow Vale Parkway",
    mobile          : "1 207-165-0389",
    home            : "1 217-269-2769",
};
global.data = data;
global.data3 = data.slice(0,3);
global.data10 = data.slice(0,10);

global.conf = conf;
// global.Promises = Promises;

// src/js...
global.getColumns = getColumns;
global.ucwords = ucwords;

// For printing hooks in mddocs/hooks.md
global.jsonPrintFunction = jsonPrintFunction;

global.useColumns = useColumns;
global.useData = useData;
global.useDataGrid = useDataGrid;
global.usePages = usePages;

// global.Show = Show;
// global.Text = Text;

global.Buttons = Buttons;
global.ColumnOrder = ColumnOrder;
global.Grid = Grid;
global.Labels = Labels;
global.Page = Page;
global.PerPage = PerPage;
global.Rows = Rows;
global.SampleRow = SampleRow;

// global.ChangePassword = ChangePassword;
// global.Login = Login;
