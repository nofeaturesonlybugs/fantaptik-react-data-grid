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
    ],

    //
    // SECTIONS

    //tocMode : 'collapse', // TODO

    pagePerSection : true,

    // TODO No sections yet.
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
        // {
        //     name : 'Forms',
        //     content : 'src/forms/forms.md',
        //     components : 'src/forms/**/*.js',
        //     sectionDepth : 1,
        // },
        // {
        //     name : 'Inputs',
        //     content : 'src/components/inputs/inputs.md',
        //     components : 'src/components/inputs/**/*.js',
        //     sectionDepth : 1,
        // },
        // {
        //     name : 'Layout',
        //     content : 'src/components/layout/layout.md',
        //     components : 'src/components/layout/**/*.js',
        //     sectionDepth : 1,
        // },
        // {
        //     name : 'Visual',
        //     content : 'src/components/visual/visual.md',
        //     components : 'src/components/visual/**/*.js',
        //     sectionDepth : 1,
        // }
    ],

    //
    // STYLES
    styles : './styleguide.styles.js',
};