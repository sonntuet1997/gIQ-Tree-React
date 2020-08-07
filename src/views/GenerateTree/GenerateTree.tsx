import React from 'reactn';
import './GenerateTree.scss';
import {withRouter} from 'react-router-dom';
import {Button, Checkbox, Collapse, Form, Input, InputNumber, Radio, Select, Switch, Upload} from "antd";
import {CaretRightOutlined, InboxOutlined} from '@ant-design/icons';
import {useTranslation} from "react-i18next";
import {_GenerateTreeRepository} from "../../repositories/GenerateTreeRepository";
import {useForm} from "antd/es/form/Form";
import {Rule} from "antd/es/form";
import {useRef, useState} from "react";
import {WebSocketDemo} from "../Test/Test";
import MyTerminal from "../ResultView/myTerminal";

const {Panel} = Collapse;
// const text = 'dsfsdfsdfsdfsdf';
//
// const Construct = {
//     inputData: {},
//     substiOption: {}, branchSp: {}, searchParameter: {}
// }


const AddColon = (label: string) => (label + ': ');

const PanelAndHeader = (name: string, i: number) => {
    return (
        <Panel header={`${i + 1}. ${name}`.toUpperCase()} key={name}
               className="site-collapse-custom-panel">
        </Panel>
    )
}

const File = ({name, label, value, onChange, action = "", directory = false, beforeUpload = () => false, multiple = false}
                  : { action?: string, name: string, label: string; value: string, onChange?: any, directory?: boolean, beforeUpload?: any, multiple?: boolean }) => {
    return (
        <Form.Item label={AddColon(label)} name={name} valuePropName="file">
            <Upload action={action} directory={directory} onChange={onChange}
                    beforeUpload={beforeUpload} multiple={multiple}>
                <Button>
                    <InboxOutlined/> {value}
                </Button>{/*<p className="ant-upload-drag-icon">*/}
                {/*<InboxOutlined/>*/}
                {/*</p>*/}
                {/*<p className="ant-upload-hint">Support for a single or bulk upload.</p>*/}
            </Upload>
            {/*<Upload.Dragger >*/}
            {/*    <Button>*/}
            {/*        <UploadOutlined/> {value}*/}
            {/*    </Button>*/}
            {/*</Upload.Dragger>*/}
        </Form.Item>
    )
}

const Toggle = ({label, name, onChange}: { label: string, name: string, onChange?: any }) => {
    return (
        <Form.Item label={AddColon(label)} name={name} valuePropName="checked">
            <Switch onChange={onChange}/>
        </Form.Item>
    )
}

const RadioGroup = ({label, name, values, onChange}: { onChange?: any, name: string, label: string, values: { value: string, label: string }[] }) => {
    return (
        <Form.Item label={AddColon(label)} name={name}>
            <Radio.Group onChange={onChange}>
                {values.map(value => (
                    <Radio.Button value={value.value} key={value.value}>{value.label}</Radio.Button>))}
            </Radio.Group>
        </Form.Item>
    )
}


const CheckBoxGroup = ({label, values, name, onChange}: { onChange?: any, name: string, label: string, values: { value: string, label: string }[] }) => {
    return (
        <Form.Item label={AddColon(label)} name={name}>
            <Checkbox.Group options={values} onChange={onChange}/>
        </Form.Item>
    )
}

const SelectGroup = ({label, values, name, onChange}: { onChange?: any, name: string, label: string, values: { value: string, label?: string }[] }) => {
    return (
        <Form.Item label={AddColon(label)} name={name}>
            <Select onChange={onChange}>
                {values.map(vl => (
                    <Select.Option value={vl.value} key={vl.value}>{vl.label ? vl.label : vl.value}</Select.Option>))}
            </Select>
        </Form.Item>
    )
}

const Inputt = (label: string, props: any) => {
    return (
        <Form.Item label={AddColon(label)}>
            <Input {...props}>
            </Input>
        </Form.Item>
    )
}

const Inputnumberr = ({label, rules, name, onChange}: { onChange?: any, name: string, label: string, rules: Rule[] }) => {
    return (
        <Form.Item label={AddColon(label)} name={name} rules={rules}>
            <InputNumber onChange={onChange}>
            </InputNumber>
        </Form.Item>
    )
}


function GenerateTree() {
    const [translate] = useTranslation();
    const [form] = useForm();
    const [alignment, setAlignment] = useState();
    const [logLink, setLogLink] = useState("");
    const startGenerate = (form: any) => {
        console.log(form.getFieldsValue());
        let formData = new FormData();
        formData.append("alignment", form.getFieldsValue().AlignmentFile.file);
        _GenerateTreeRepository.startGenerate(formData).subscribe(x => {
            setLogLink(":8080/LogEndpoint/" + x);
        });
    }

    const LabelData = {
        InputData: {
            label: translate('generateTree.InputData.Label'),
            AlignmentFile: {
                label: translate('generateTree.InputData.AlignmentFile'),
                value: translate('generateTree.InputData.AlignmentFileInT')
            },
            UseExampleAlignmentFile: {
                label: translate('generateTree.InputData.UseExampleAlignmentFile'),
            },
            SequenceType: {
                label: translate('generateTree.InputData.SequenceType.Label'),
                values: [
                    {value: '0', label: translate('generateTree.InputData.SequenceType.autoDetect')},
                    {value: '1', label: translate('generateTree.InputData.SequenceType.dNA')},
                    {value: '2', label: translate('generateTree.InputData.SequenceType.protein')},
                    {value: '3', label: translate('generateTree.InputData.SequenceType.codon')},
                    {value: '4', label: translate('generateTree.InputData.SequenceType.dna2Aa')},
                    {value: '5', label: translate('generateTree.InputData.SequenceType.binary')},
                    {value: '6', label: translate('generateTree.InputData.SequenceType.morphology')}
                ]
            },
            GeneticCode: {
                label: translate('generateTree.InputData.GeneticCode.Label'),
                values: [
                    {value: '0', label: translate('generateTree.InputData.GeneticCode.autoDetect')},
                    {value: '1', label: translate('generateTree.InputData.GeneticCode.dNA')},
                    {value: '2', label: translate('generateTree.InputData.GeneticCode.protein')},
                    {value: '3', label: translate('generateTree.InputData.GeneticCode.codon')},
                    {value: '4', label: translate('generateTree.InputData.GeneticCode.dna2Aa')}
                ]
            },
            PartitionFile: {
                label: translate('generateTree.InputData.PartitionFile'),
                value: translate('generateTree.InputData.PartitionFileInT')
            },
            PartitionType: {
                label: translate('generateTree.InputData.PartitionType.Label'),
                values: [
                    {value: '0', label: translate('generateTree.InputData.PartitionType.EdgeLinked')},
                    {value: '1', label: translate('generateTree.InputData.PartitionType.EdgeUnlinked')},
                ]
            }
        },
        SubstitutionOption: {
            label: translate('generateTree.SubstitutionOption.Label'),
            SubstitutionModel: {
                label: translate('generateTree.SubstitutionOption.SubstitutionModel.Label'),
                values: [{value: "Auto"}, {value: "---Binary---"}, {value: "JC2"}, {value: "GTR2"}, {value: "---DNA---"}, {value: "JC"},
                    {value: "F81"}, {value: "K80"}, {value: "HKY"}, {value: "TNe"}, {value: "TN"}, {value: "K81"},
                    {value: "K81u"}, {value: "TPM2"}, {value: "TPM2u"}, {value: "TPM3"}, {value: "TPM3u"},
                    {value: "TIMe"}, {value: "TIM"}, {value: "TIM2e"}, {value: "TIM2"}, {value: "TIM3e"},
                    {value: "TIM3"}, {value: "TVMe"}, {value: "TVM"}, {value: "SYM"}, {value: "GTR"},
                    {value: "---Protein---"}, {value: "Blosum62"}, {value: "cpREV"}, {value: "Dayhoff"},
                    {value: "DCMut"}, {value: "FLU"}, {value: "HIVb"}, {value: "HIVw"}, {value: "JTT"},
                    {value: "JTTDCMut"}, {value: "LG"}, {value: "mtART"}, {value: "mtMAM"}, {value: "mtREV"},
                    {value: "mtZOA"}, {value: "PMB"}, {value: "rtREV"}, {value: "VT"}, {value: "WAG"},
                    {value: "---Mixture model---"}, {value: "LG4M"}, {value: "LG4X"}, {value: "JTT+CF4"},
                    {value: "C10"}, {value: "C20"}, {value: "EX2"}, {value: "EX3"}, {value: "EHO"}, {value: "UL2"},
                    {value: "UL3"}, {value: "EX_EHO"}, {value: "---Codon---"}, {value: "GY"}, {value: "MG"}, {value: "MGK"},
                    {value: "GY0K"}, {value: "GY1KTS"}, {value: "GY1KTV"}, {value: "GY2K"}, {value: "MG1KTS"}, {value: "MG1KTV"},
                    {value: "MG2K"}, {value: "KOSI07"}, {value: "SCHN05"}, {value: "---Morphology---"}, {value: "MK"}, {value: "ORDERED"}]
            },
            FreeRateHeterogeneity: {
                label: translate('generateTree.SubstitutionOption.FreeRateHeterogeneity.Label'),
                values: [{value: 'R', label: translate('generateTree.SubstitutionOption.FreeRateHeterogeneity.R')}]
                // value: translate()
            },
            RateHeterogeneity: {
                label: translate('generateTree.SubstitutionOption.RateHeterogeneity.Label'),
                values: [
                    {value: 'G', label: translate('generateTree.SubstitutionOption.RateHeterogeneity.G')},
                    {value: 'I', label: translate('generateTree.SubstitutionOption.RateHeterogeneity.I')}
                ]
            },
            RateCategory: {
                label: translate('generateTree.SubstitutionOption.RateCategory.Label'),
                rules: [{
                    defaultValue: 4,
                    min: 2,
                    max: 64,
                    required: true,
                }]
            },
            StateFrequency: {
                label: translate('generateTree.SubstitutionOption.StateFrequency.Label'),
                values: [
                    {value: '0', label: translate('generateTree.SubstitutionOption.StateFrequency.Empirical')},
                    {value: '1', label: translate('generateTree.SubstitutionOption.StateFrequency.AAModel')},
                    {value: '2', label: translate('generateTree.SubstitutionOption.StateFrequency.MLOptimized')},
                    {value: '3', label: translate('generateTree.SubstitutionOption.StateFrequency.CodonF1x4')},
                    {value: '4', label: translate('generateTree.SubstitutionOption.StateFrequency.CodonF3x4')}
                ]
            },
            AscertainmentCorrection: {
                label: translate('generateTree.SubstitutionOption.AscertainmentCorrection.Label'),
                values: [
                    {value: '0', label: translate('generateTree.SubstitutionOption.AscertainmentCorrection.ASC')}
                ]
            }
        },
        BranchSupportAnalysis: {
            label: translate('generateTree.BranchSupportAnalysis.Label'),
            BootstrapAnalysis: {
                label: translate('generateTree.BranchSupportAnalysis.BootstrapAnalysis.Label'),
                values: [
                    {value: '0', label: translate('generateTree.BranchSupportAnalysis.BootstrapAnalysis.None')},
                    {value: '1', label: translate('generateTree.BranchSupportAnalysis.BootstrapAnalysis.UltraFast')},
                    {value: '2', label: translate('generateTree.BranchSupportAnalysis.BootstrapAnalysis.Standard')},
                ]
            },
            NumberBootstrap: {
                label: translate('generateTree.BranchSupportAnalysis.NumberBootstrap.Label'),
                rules: [{
                    defaultValue: 1000,
                    min: 100,
                    max: 1000,
                    step: 100
                }]
            },
            CreateUfBootFile: {
                label: translate('generateTree.BranchSupportAnalysis.CreateUfBootFile.Label'),
                values: [{value: 'Yes', label: translate('generateTree.BranchSupportAnalysis.CreateUfBootFile.Yes')}]
                // value: translate()
            },
            MaxIteration: {
                label: translate('generateTree.BranchSupportAnalysis.MaxIteration.Label'),
                rules: [{
                    defaultValue: 1000,
                    min: 1000,
                    step: 100
                }]
            },
            MinCorrelation: {
                label: translate('generateTree.BranchSupportAnalysis.MinCorrelation.Label'),
                rules: [{
                    initialValue: 0.99,
                    min: 0,
                    step: 0.01
                }]
            },
            SingleBranchTest: {
                label: translate('generateTree.BranchSupportAnalysis.SingleBranchTest.Label'),
                SHaLRTTest: {
                    label: translate('generateTree.BranchSupportAnalysis.SingleBranchTest.SHaLRTTest'),
                },
                Replicates: {
                    label: translate('generateTree.BranchSupportAnalysis.SingleBranchTest.Replicates'),
                    rules: [{
                        defaultValue: 1000,
                        min: 1000,
                        max: 10000
                    }]
                },
                ApproximateBayes: {
                    label: translate('generateTree.BranchSupportAnalysis.SingleBranchTest.ApproximateBayes.Label'),
                    values: [{
                        value: 'Yes',
                        label: translate('generateTree.BranchSupportAnalysis.SingleBranchTest.ApproximateBayes.Yes')
                    }]
                }
            }
        },
        SearchParameters: {
            label: translate('generateTree.SearchParameters.Label'),
            PerturbationStrength: {
                label: translate('generateTree.SearchParameters.PerturbationStrength.Label'),
                rules: [{
                    defaultValue: 0.5,
                    min: 0,
                    step: 0.1,
                    max: 1
                }]
            },
            StoppingRule: {
                label: translate('generateTree.SearchParameters.StoppingRule.Label'),
                rules: [{
                    defaultValue: 100,
                    min: 100,
                    step: 10
                }]
            }
        },
        Generate: {
            label: translate('generateTree.Generate.Label')
        }
    }
    const t: any = useRef(new MyTerminal({commands:{}}));
    // t.pushToStdout("sdasdasd",{isEcho:true});
    // t.pushToStdout("sdasdasd",{isEcho:false});
    // t.pushToStdout("sdasdasd",{isEcho:true});
    // t.pushToStdout("sdasdasd",{isEcho:false});
    // t.pushToStdout("sdasdasd",{isEcho:true});
    // t.pushToStdout("sdasdasd",{isEcho:true});
    // t.componentDidMount()
    return (
        <Form form={form}>
            <Collapse
                bordered={false} accordion={true}
                defaultActiveKey={[1]}
                expandIcon={({isActive}) => <CaretRightOutlined rotate={isActive ? 90 : 0}/>}
                className="site-collapse-custom-collapse">
                {/*{Object.keys(Construct).map((key, i) => PanelAndHeader(key, i))}*/}
                <Panel header={`1. ` + LabelData.InputData.label.toUpperCase()} key={1}
                       className="site-collapse-custom-panel">
                    {/*<Form.Item label="Dragger">*/}
                    {/*    <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>*/}
                    {/*        <Upload.Dragger name="files" action="/upload.do">*/}
                    {/*            <p className="ant-upload-drag-icon">*/}
                    {/*                <InboxOutlined/>*/}
                    {/*            </p>*/}
                    {/*            <p className="ant-upload-text">Click or drag file to this area to upload</p>*/}
                    {/*            <p className="ant-upload-hint">Support for a single or bulk upload.</p>*/}
                    {/*        </Upload.Dragger>*/}
                    {/*    </Form.Item>*/}
                    {/*</Form.Item>*/}

                    <File {...LabelData.InputData.AlignmentFile} name={"AlignmentFile"}/>
                    {/*<File {...LabelData.InputData.AlignmentFile} name={"AlignmentFile"}*/}
                    {/*      onChange={({file}: { file: any }) => {*/}
                    {/*          const reader = new FileReader();*/}
                    {/*          console.log(file);*/}
                    {/*          reader.addEventListener('load', () => setAlignment(reader.result as any));*/}
                    {/*          reader.readAsArrayBuffer(file);*/}
                    {/*      }}/>*/}
                    <Toggle {...LabelData.InputData.UseExampleAlignmentFile} name={"UseExampleAlignmentFile"}/>
                    <RadioGroup {...LabelData.InputData.SequenceType} name={"SequenceType"}
                                onChange={() => console.log(form.getFieldsValue())}/>
                    <SelectGroup {...LabelData.InputData.GeneticCode} name={"GeneticCode"}
                                 onChange={() => console.log(form.getFieldsValue())}/>
                    <File {...LabelData.InputData.PartitionFile} name={"PartitionFile"}/>
                    <RadioGroup {...LabelData.InputData.PartitionType} name={"PartitionType"}
                                onChange={() => console.log(form.getFieldsValue())}/>
                </Panel>
                <Panel header={`2. ` + LabelData.SubstitutionOption.label.toUpperCase()} key={2}
                       className="site-collapse-custom-panel">
                    <SelectGroup {...LabelData.SubstitutionOption.SubstitutionModel} name={"SubstitutionModel"}/>
                    <CheckBoxGroup   {...LabelData.SubstitutionOption.FreeRateHeterogeneity}
                                     name={"FreeRateHeterogeneity"}/>
                    <CheckBoxGroup   {...LabelData.SubstitutionOption.RateHeterogeneity} name={"RateHeterogeneity"}/>
                    <Inputnumberr {...LabelData.SubstitutionOption.RateCategory} name={"RateCategory"}/>
                    <RadioGroup {...LabelData.SubstitutionOption.StateFrequency} name={"StateFrequency"}/>
                    <CheckBoxGroup   {...LabelData.SubstitutionOption.AscertainmentCorrection}
                                     name={"AscertainmentCorrection"}/>
                </Panel>
                <Panel header={`3. ` + LabelData.BranchSupportAnalysis.label.toUpperCase()} key={3}
                       className="site-collapse-custom-panel">
                    <RadioGroup {...LabelData.BranchSupportAnalysis.BootstrapAnalysis} name={"BootstrapAnalysis"}/>
                    <Inputnumberr {...LabelData.BranchSupportAnalysis.NumberBootstrap} name={"NumberBootstrap"}/>
                    <CheckBoxGroup   {...LabelData.BranchSupportAnalysis.CreateUfBootFile} name={"CreateUfBootFile"}/>
                    <Inputnumberr {...LabelData.BranchSupportAnalysis.MaxIteration} name={"MaxIteration"}/>
                    <Inputnumberr {...LabelData.BranchSupportAnalysis.MinCorrelation} name={"MinCorrelation"}/>
                    <p>{LabelData.BranchSupportAnalysis.SingleBranchTest.label}</p>
                    <Toggle {...LabelData.BranchSupportAnalysis.SingleBranchTest.SHaLRTTest} name={"SHaLRTTest"}/>
                    <Inputnumberr {...LabelData.BranchSupportAnalysis.SingleBranchTest.Replicates} name={"Replicates"}/>
                    <RadioGroup {...LabelData.BranchSupportAnalysis.SingleBranchTest.ApproximateBayes}
                                name={"ApproximateBayes"}/>
                </Panel>
                <Panel header={`4. ` + LabelData.SearchParameters.label.toUpperCase()} key={4}
                       className="site-collapse-custom-panel">
                    <Inputnumberr {...LabelData.SearchParameters.PerturbationStrength} name={"PartitionType"}/>
                    <Inputnumberr {...LabelData.SearchParameters.StoppingRule} name={"PartitionType"}/>
                </Panel>
            </Collapse>
            {/*{logLink != "" ?*/}
                 <><MyTerminal commands={{}} ref={t} style={{height:'30px'}}/>
                    <WebSocketDemo onJson={(newMes: any) => {
                        console.log(newMes);
                        (t as any).current.pushToStdout(newMes?.content);
                        (t as any).current.scrollToBottom();
                    }} logLink={logLink}/>
                 </>
                {/*// : null}*/}
            <Button onClick={() => startGenerate(form)}
                    type={"primary"}>{LabelData.Generate.label.toUpperCase()}</Button>
        </Form>
    );
}

const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};


export default withRouter(GenerateTree);
