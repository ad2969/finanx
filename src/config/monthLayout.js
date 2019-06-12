import $ from 'jquery';

var monthLayout = new GoldenLayout({
    content: [{
        type: 'row',
        content:[{
            type:'react-component',
            component: 'test-component',
            props: { label: 'A' }
        },{
            type: 'column',
            content:[{
                type:'react-component',
                component: 'test-component',
                props: { label: 'B' }
            },{
                type:'react-component',
                component: 'test-component',
                props: { label: 'C' }
            }]
        }]
    }]
});
