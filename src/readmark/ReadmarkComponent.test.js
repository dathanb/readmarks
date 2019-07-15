import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {ReadmarkComponent} from './Readmark';
import {Readmark} from '../readmarksApi/types/Readmark';

describe('ReadmarkComponent', () => {
    let renderer;
    beforeEach(() => {
        renderer = new ShallowRenderer();
    });

    test('Displays a message when loading', () => {
        renderer.render(<ReadmarkComponent loading={true} currentUrl={""}/>);
        const result = renderer.getRenderOutput();

        expect(result.type).toBe('p');
        expect(result.props.children).toEqual("Loading...");
    });

    test("Renders the current url as missing when there is no readmark for the current context", () => {
        let component = <ReadmarkComponent loading={false}
                                           currentUrl={"http://www.example.com"}
                                           readmark={null}
        />;
        const result = renderer.render(component);
        expect(result.type).toBe('p');
        expect(result.props.className).toBe('missing');
    });

    test("Renders the current url as mismatched when it doesn't match the readmark for the current context", () => {
        let component = <ReadmarkComponent loading={false}
                                           currentUrl={"http://www.example.com/1"}
                                           readmark={new Readmark("http://www.example.com/2")}
        />;
        const result = renderer.render(component);
        expect(result.type).toBe('p');
        expect(result.props.className).toBe('mismatched');
    });

    test("Renders the current url as matched when it matches the readmark for the current context", () => {
        let component = <ReadmarkComponent loading={false}
                                           currentUrl={"http://www.example.com/1"}
                                           readmark={new Readmark("http://www.example.com/1")}
        />;
        const result = renderer.render(component);
        expect(result.type).toBe('p');
        expect(result.props.className).toBe('matched');

    });
});
