const path = require( 'path' );

module.exports = {
    styleguideDir : "docs",
    
    skipComponentsWithoutExample : false,
    
    require : [
        path.join( __dirname, 'node_modules/materialize-css/dist/css/materialize.min.css' ),
        path.join( __dirname, 'styleguide.globals.js' ),
    ],

    template : {
        head : {
            links : [
                {
                    rel : 'stylesheet',
                    href : 'https://fonts.googleapis.com/icon?family=Material+Icons',
                },
            ],
        },
    },

    ignore : [
        '**/components/**/common.js',
        '**/components/**/context.js',
        //
        'src/components/GridFeed/Progress.*',
        'src/components/GridFeed/Label.*',
    ],

    //
    // SECTIONS

    //tocMode : 'collapse', // TODO

    pagePerSection : true,

    sections : [
        {
            name : 'jsdocs',
            href : '../jsdocs/index.html',
            external : true,
        },
        {
            name : 'styling',
            content : 'mddocs/styles.md',
        },
        {
            name : 'hooks',
            content : 'mddocs/hooks.md',
        },
        {
            name : 'isolated',
            content : 'mddocs/isolate.md',
        },
        {
            name : 'Components',
            content : 'src/components/components.md',
            components : 'src/components/**/*.js',
            sectionDepth : 1,
        },
        {
            name : 'Sample Components',
            content : 'src/sample-components/sample-components.md',
            components : 'src/sample-components/**/*.js',
            sectionDepth : 1,
        },
    ],

    //
    // STYLES
    styles : './styleguide.styles.js',
};