// TODO Update
import data from './mock/mock-data';

import conf from './src/conf/conf';

import { usePages } from './src/hooks';

// import Promises from './src/lib/Promises';

// import { Show, Text } from '@fantaptik/react-material';

import Buttons from './src/components/Buttons/Buttons';
import Grid from './src/components/Grid/Grid';
import Labels from './src/components/Labels/Labels';
import Pages from './src/components/Pages/Pages';
import Rows from './src/components/Rows/Rows';

// import ChangePassword from './src/forms/ChangePassword/ChangePassword';
// import Login from './src/forms/Login/Login';

global.data = data;
global.data3 = data.slice(0,3);
global.data10 = data.slice(0,10);

global.conf = conf;
// global.Promises = Promises;

global.usePages = usePages;

// global.Show = Show;
// global.Text = Text;

global.Buttons = Buttons;
global.Grid = Grid;
global.Labels = Labels;
global.Pages = Pages;
global.Rows = Rows;

// global.ChangePassword = ChangePassword;
// global.Login = Login;
