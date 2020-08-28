import React, {Fragment} from 'react';
import './CustomForm.scss';
import {Button, Checkbox as AntCheckBox, Collapse, Form, Input, InputNumber, Radio, Select, Switch, Upload} from "antd";
import {InboxOutlined} from '@ant-design/icons';

const {Panel} = Collapse;

const AddColon = (label: string) => (label + ': ');

const File = ({rules, name, label, value, onChange, action = "", directory = false, disabled = false, beforeUpload = () => false, multiple = false}
                  : { rules?: any, action?: string, name: string, label: string; value: string, disabled?: boolean, onChange?: any, directory?: boolean, beforeUpload?: any, multiple?: boolean }) => {
    // console.log(1);
    return (<Form.Item rules={rules} label={AddColon(label)} name={name} valuePropName="file">
        <Upload action={action} directory={directory} onChange={(e:any) => {
            if(e.fileList.length == 0){
                e.file = null;
            }
            onChange(e.fileList.length == 0 ? null : e);
        }} disabled={disabled}
                beforeUpload={beforeUpload} multiple={multiple}>
            <Button disabled={disabled}>
                <InboxOutlined/> {value}
            </Button> </Upload>
        {/*<Upload.Dragger >*/}
        {/*    <Button>*/}
        {/*        <UploadOutlined/> {value}*/}
        {/*    </Button>*/}
        {/*</Upload.Dragger>*/}
    </Form.Item>)
}

const Toggle = ({label, name, onChange, disabled = false}: { label: string, name: string, disabled?: boolean, onChange?: any }) => {
    return (
        <Form.Item label={AddColon(label)} name={name} valuePropName="checked">
            <Switch onChange={onChange} disabled={disabled}/>
        </Form.Item>
    )
}

const RadioGroup = ({label, name, values, onChange, disabled = false}: { disabled?: boolean, onChange?: any, name: string, label: string, values: { value: string, label: string }[] }) => {
    return (
        <Form.Item label={AddColon(label)} name={name}>
            <Radio.Group onChange={onChange} disabled={disabled}>
                {values.map(value => (
                    <Radio.Button value={value.value} key={value.value}>{value.label}</Radio.Button>))}
            </Radio.Group>
        </Form.Item>
    )
}


const CheckBoxGroup = ({label, values, name, onChange, disabled = false}: { disabled?: boolean, onChange?: any, name: string, label: string, values: { value: string, label: string }[] }) => {
    return (
        <Form.Item label={AddColon(label)} name={name}>
            <AntCheckBox.Group options={values} onChange={onChange} disabled={disabled}/>
        </Form.Item>
    )
}
const CheckBox = ({label, name, onChange, disabled = false, value}: { disabled?: boolean, onChange?: any, name: string, label: string, value: { label: string } }) => {
    return (
        <Form.Item label={AddColon(label)} name={name} valuePropName="checked">
            <AntCheckBox onChange={onChange} disabled={disabled}>{value.label}</AntCheckBox>
        </Form.Item>
    )
}

const SelectGroup = ({label, values, name, onChange, disabled = false}: { disabled?: boolean, onChange?: any, name: string, label: string, values: { value: string, label?: string }[] }) => {
    return (
        <Form.Item label={AddColon(label)} name={name}>
            <Select onChange={onChange} disabled={disabled}>
                {values.map(vl => (
                    <Select.Option value={vl.value} key={vl.value}>{vl.label ? vl.label : vl.value}</Select.Option>))}
            </Select>
        </Form.Item>
    )
}

const InputText = (label: string, props: any) => {
    return (
        <Form.Item label={AddColon(label)}>
            <Input {...props}>
            </Input>
        </Form.Item>
    )
}

const Inputnumberr = ({label, rules, name, onChange, disabled = false}: { disabled?: boolean, onChange?: any, name: string, label: string, rules: any }) => {
    return (
        <Form.Item label={AddColon(label)} name={name} rules={rules}>
            <InputNumber onChange={onChange} disabled={disabled}>
            </InputNumber>
        </Form.Item>
    )
}


export function CustomForm({onFieldsChange, parentName = "", parentDataStructure, path = [], key}: { key?: string, onFieldsChange?: any, parentName?: any, data?: any, parentDataStructure: any, path?: string[] }) {
    // console.log(data);
    // console.log(parentName);
    const dataStructure = parentDataStructure[parentName] ?? parentDataStructure;
    // console.log(dataStructure);
    let parentComponent = dataStructure.parentComponent;
    // console.log(ParentComponent);
    // console.log(dataStructure);
    const myForm = (): JSX.Element => (<Fragment key={key}>
        {Object.keys(dataStructure).map(name => {
            if (name == 'label' || name == 'parentComponent') {
                // console.log(name, 1);
                return null;
            }
            if (name.indexOf("decorate") > -1) {
                // console.log(name, 2);
                return dataStructure[name];
            }
            if (!dataStructure[name].type) {
                // console.log(name, 3);
                if ((typeof dataStructure[name]) == 'string' || Object.keys(dataStructure[name]).length == 0) {
                    throw new Error("config " + name + ":" + JSON.stringify(parentDataStructure));
                }
                // console.log(name, 4);
                const newPath = parentName == "" ? [...path] : [...path, parentName];
                // console.log(newPath, 5);
                return CustomForm({
                    onFieldsChange: onFieldsChange,
                    parentName: name,
                    parentDataStructure: dataStructure,
                    path: newPath,
                    key: parentName + name
                });
            }
            if (dataStructure[name].type == 'Toggle') {
                return (<Toggle {...dataStructure[name]} name={[...path, parentName, name]} key={parentName + name}/>)
            }
            if (dataStructure[name].type == 'File') {
                return (<File {...dataStructure[name]} name={[...path, parentName, name]} key={parentName + name}/>)
            }
            if (dataStructure[name].type == 'RadioGroup') {
                return (
                    <RadioGroup {...dataStructure[name]} name={[...path, parentName, name]} key={parentName + name}/>)
            }
            if (dataStructure[name].type == 'SelectGroup') {
                return (
                    <SelectGroup {...dataStructure[name]} name={[...path, parentName, name]} key={parentName + name}/>)
            }
            if (dataStructure[name].type == 'InputNumber') {
                return (
                    <Inputnumberr {...dataStructure[name]} name={[...path, parentName, name]} key={parentName + name}/>)
            }
            if (dataStructure[name].type == 'CheckBoxGroup') {
                return (<CheckBoxGroup {...dataStructure[name]} name={[...path, parentName, name]}
                                       key={parentName + name}/>)
            }
            if (dataStructure[name].type == 'CheckBox') {
                return (<CheckBox {...dataStructure[name]} name={[...path, parentName, name]} key={parentName + name}/>)
            }
        })}
    </Fragment>);
    return (parentComponent ? parentComponent(myForm) : myForm());
}

const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};