import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { ReadmarkComponent } from './readmark';

it('Displays a message when loading', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<ReadmarkComponent loading={true} currentUrl={""} />);
    const result = renderer.getRenderOutput();

    expect(result.type).toBe('p');
    expect(result.props.children).toEqual("Loading...");
});
