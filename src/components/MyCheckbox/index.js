import React, { PureComponent } from 'react';
import { Checkbox } from 'antd';

export default class MyCheckbox extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: !!props.value,
        };
    }

    handleChange = (evt) => {
        const { onChange } = this.props;
        onChange && onChange(evt);
        this.setState({
            value: evt.target.checked,
        });
    }

    render() {
        const { value } = this.state;
        const { text } = this.props;
        return (
            <Checkbox
                checked={value}
                onChange={this.handleChange}
            >
                { text || '' }
            </Checkbox>
        );
    }
}
