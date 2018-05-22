import React, { PureComponent } from 'react';
import { Checkbox } from 'antd';

export default class MyCheckbox extends PureComponent {
    render() {
        const { text, value, onChange } = this.props;
        return (
            <Checkbox
                checked={value}
                onChange={onChange}
            >
                { text || '' }
            </Checkbox>
        );
    }
}
