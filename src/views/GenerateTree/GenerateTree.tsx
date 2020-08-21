import React from 'reactn';
import './GenerateTree.scss';
import {withRouter} from 'react-router-dom';
import {Button, Collapse, Form} from "antd";
import {CaretRightOutlined} from '@ant-design/icons';
import {useTranslation} from "react-i18next";
import {_GenerateTreeRepository} from "../../repositories/GenerateTreeRepository";
import {useForm} from "antd/es/form/Form";
import {useResultView} from "../ResultView/ResultViewHook";
import {GenerateTreeRequest} from "../../models/GenerateTreeRequest";
import {CustomForm} from "../../components/Form/CustomForm";
import nextId from "react-id-generator";
import {useState} from "react";

const {Panel} = Collapse;

function GenerateTree() {
    const [translate] = useTranslation();
    const [form] = useForm();
    // const [alignment, setAlignment] = useState();
    const {logs, appendLog, removeLog} = useResultView();
    const startGenerate = (form: any) => {
        console.log(form.getFieldsValue());
        let formData = new FormData();
        if (!useExampleFile) formData.append("alignment", form.getFieldsValue().inputData.alignmentFile.file);
        formData.append("data", JSON.stringify(form.getFieldsValue()));
        _GenerateTreeRepository.startGenerate(formData).subscribe(x => {
            appendLog(x);
        }, error => {
            throw new Error(error);
        });
    }
    const r = new GenerateTreeRequest();
    r.BranchSupportAnalysis = {
        CreateUfBootFile: "",
        MaxIteration: "",
        MinCorrelation: "",
        NumberBootstrap: "",
        SingleBranchTest: {ApproximateBayes: "", Replicates: "", SHaLRTTest: ""},
        BootstrapAnalysis: "sadsd"
    };
    r.InputData = {
        AlignmentFile: "",
        GeneticCode: "",
        PartitionFile: "",
        PartitionType: "",
        SequenceType: "",
        UseExampleAlignmentFile: true
    }
    r.SubstitutionOption = {
        AscertainmentCorrection: "",
        FreeRateHeterogeneity: "",
        RateCategory: 4,
        RateHeterogeneity: "",
        StateFrequency: "",
        SubstitutionModel: ""
    }
    r.SearchParameters = {PerturbationStrength: "", StoppingRule: ""}
    const [useExampleFile, setUseExampleFile] = useState(false);
    const LabelData = {
        inputData: {
            parentComponent: (child: any) => {
                return (<Panel header={`1. ` + translate('generateTree.InputData.Label').toUpperCase()} key={1}
                               className="site-collapse-custom-panel">{child()}</Panel>)
            },
            alignmentFile: {
                type: 'File',
                label: translate('generateTree.InputData.AlignmentFile'),
                value: translate('generateTree.InputData.AlignmentFileInT'),
                onChange: () => {
                    console.log(form.getFieldsValue())
                },
                disabled: useExampleFile
            },
            useExampleAlignmentFile: {
                type: 'Toggle',
                label: translate('generateTree.InputData.UseExampleAlignmentFile'),
                onChange: (e: any) => {
                    console.log(e);
                    setUseExampleFile(e);
                    console.log(form.getFieldsValue())
                }
            },
            sequenceType: {
                type: 'RadioGroup',
                label: translate('generateTree.InputData.SequenceType.Label'),
                values: [
                    {value: 'AUTO', label: translate('generateTree.InputData.SequenceType.autoDetect')},
                    {value: 'DNA', label: translate('generateTree.InputData.SequenceType.dNA')},
                    {value: 'AA', label: translate('generateTree.InputData.SequenceType.protein')},
                    {value: 'CODON', label: translate('generateTree.InputData.SequenceType.codon')},
                    {value: 'NT2AA', label: translate('generateTree.InputData.SequenceType.dna2Aa')},
                    {value: 'BIN', label: translate('generateTree.InputData.SequenceType.binary')},
                    {value: 'MORPH', label: translate('generateTree.InputData.SequenceType.morphology')}
                ],
                onChange: () => {
                    console.log(form.getFieldsValue())
                },
            },
            geneticCode: {
                type: 'SelectGroup',
                label: translate('generateTree.InputData.GeneticCode.Label'),
                values: [
                    {value: '0', label: translate('generateTree.InputData.GeneticCode.autoDetect')},
                    {value: '1', label: translate('generateTree.InputData.GeneticCode.dNA')},
                    {value: '2', label: translate('generateTree.InputData.GeneticCode.protein')},
                    {value: '3', label: translate('generateTree.InputData.GeneticCode.codon')},
                    {value: '4', label: translate('generateTree.InputData.GeneticCode.dna2Aa')}
                ],
                onChange: () => {
                    console.log(form.getFieldsValue())
                }
            },
            partitionFile: {
                type: 'File',
                label: translate('generateTree.InputData.PartitionFile'),
                value: translate('generateTree.InputData.PartitionFileInT'),
                onChange: () => {
                    console.log(form.getFieldsValue())
                }
            },
            partitionType: {
                type: 'RadioGroup',
                label: translate('generateTree.InputData.PartitionType.Label'),
                values: [
                    {value: '0', label: translate('generateTree.InputData.PartitionType.EdgeLinked')},
                    {value: '1', label: translate('generateTree.InputData.PartitionType.EdgeUnlinked')},
                ],
                onChange: () => {
                    console.log(form.getFieldsValue())
                }
            }
        },
        substitutionOption: {
            parentComponent: (child: any) => {
                return (<Panel header={`2. ` + translate('generateTree.SubstitutionOption.Label').toUpperCase()} key={2}
                               className="site-collapse-custom-panel">{child()}</Panel>)
            },
            substitutionModel: {
                type: 'SelectGroup',
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
            freeRateHeterogeneity: {
                type: 'CheckBoxGroup',
                label: translate('generateTree.SubstitutionOption.FreeRateHeterogeneity.Label'),
                values: [{value: 'R', label: translate('generateTree.SubstitutionOption.FreeRateHeterogeneity.R')}]
                // value: translate()
            },
            rateHeterogeneity: {
                type: 'CheckBoxGroup',
                label: translate('generateTree.SubstitutionOption.RateHeterogeneity.Label'),
                values: [
                    {value: 'G', label: translate('generateTree.SubstitutionOption.RateHeterogeneity.G')},
                    {value: 'I', label: translate('generateTree.SubstitutionOption.RateHeterogeneity.I')}
                ]
            },
            rateCategory: {
                type: 'InputNumber',
                label: translate('generateTree.SubstitutionOption.RateCategory.Label'),
                rules: [{
                    message: 'Abc',
                    // defaultValue: 4,
                    // step:0.5,
                    // min: 2,
                    // max: 64,
                    required: true,
                }]
            },
            stateFrequency: {
                type: 'RadioGroup',
                label: translate('generateTree.SubstitutionOption.StateFrequency.Label'),
                values: [
                    {value: '0', label: translate('generateTree.SubstitutionOption.StateFrequency.Empirical')},
                    {value: '1', label: translate('generateTree.SubstitutionOption.StateFrequency.AAModel')},
                    {value: '2', label: translate('generateTree.SubstitutionOption.StateFrequency.MLOptimized')},
                    {value: '3', label: translate('generateTree.SubstitutionOption.StateFrequency.CodonF1x4')},
                    {value: '4', label: translate('generateTree.SubstitutionOption.StateFrequency.CodonF3x4')}
                ]
            },
            ascertainmentCorrection: {
                type: 'CheckBoxGroup',
                label: translate('generateTree.SubstitutionOption.AscertainmentCorrection.Label'),
                values: [
                    {value: '0', label: translate('generateTree.SubstitutionOption.AscertainmentCorrection.ASC')}
                ]
            }
        },
        branchSupportAnalysis: {
            parentComponent: (child: any) => {
                return (
                    <Panel header={`3. ` + translate('generateTree.BranchSupportAnalysis.Label').toUpperCase()} key={3}
                           className="site-collapse-custom-panel">{child()}</Panel>)
            },
            bootstrapAnalysis: {
                type: 'RadioGroup',
                label: translate('generateTree.BranchSupportAnalysis.BootstrapAnalysis.Label'),
                values: [
                    {value: '0', label: translate('generateTree.BranchSupportAnalysis.BootstrapAnalysis.None')},
                    {value: '1', label: translate('generateTree.BranchSupportAnalysis.BootstrapAnalysis.UltraFast')},
                    {value: '2', label: translate('generateTree.BranchSupportAnalysis.BootstrapAnalysis.Standard')},
                ]
            },
            numberBootstrap: {
                type: 'InputNumber',
                label: translate('generateTree.BranchSupportAnalysis.NumberBootstrap.Label'),
                rules: [{
                    // defaultValue: 1000,
                    min: 100,
                    type: 'number',
                    max: 1000,
                    // step: 100
                }]
            },
            createUfBootFile: {
                type: 'CheckBoxGroup',
                label: translate('generateTree.BranchSupportAnalysis.CreateUfBootFile.Label'),
                values: [{value: 'Yes', label: translate('generateTree.BranchSupportAnalysis.CreateUfBootFile.Yes')}]
                // value: translate()
            },
            maxIteration: {
                type: 'InputNumber',
                label: translate('generateTree.BranchSupportAnalysis.MaxIteration.Label'),
                rules: [{
                    defaultValue: 1000,
                    min: 1000,
                    step: 100
                }]
            },
            minCorrelation: {
                type: 'InputNumber',
                label: translate('generateTree.BranchSupportAnalysis.MinCorrelation.Label'),
                rules: [{
                    initialValue: 0.99,
                    min: 0,
                    step: 0.01
                }]
            },
            singleBranchTest: {
                decorate: (
                    <p key={nextId()}>{translate('generateTree.BranchSupportAnalysis.SingleBranchTest.Label')}</p>),
                sHaLRTTest: {
                    type: 'Toggle',
                    label: translate('generateTree.BranchSupportAnalysis.SingleBranchTest.SHaLRTTest'),
                },
                replicates: {
                    type: 'InputNumber',
                    label: translate('generateTree.BranchSupportAnalysis.SingleBranchTest.Replicates'),
                    rules: [{
                        defaultValue: 1000,
                        min: 1000,
                        max: 10000
                    }]
                },
                approximateBayes: {
                    type: 'RadioGroup',
                    label: translate('generateTree.BranchSupportAnalysis.SingleBranchTest.ApproximateBayes.Label'),
                    values: [{
                        value: 'Yes',
                        label: translate('generateTree.BranchSupportAnalysis.SingleBranchTest.ApproximateBayes.Yes')
                    }]
                }
            }
        },
        searchParameters: {
            parentComponent: (child: any) => {
                return (
                    <Panel header={`4. ` + translate('generateTree.SearchParameters.Label').toUpperCase()} key={4}
                           className="site-collapse-custom-panel">{child()}</Panel>)
            },
            perturbationStrength: {
                type: 'InputNumber',
                label: translate('generateTree.SearchParameters.PerturbationStrength.Label'),
                rules: [{
                    required: true,
                    message: 'abccc',
                    defaultValue: 0.5,
                    min: 0,
                    step: 0.1,
                    max: 1
                }]
            },
            stoppingRule: {
                type: 'InputNumber',
                label: translate('generateTree.SearchParameters.StoppingRule.Label'),
                rules: [{
                    defaultValue: 100,
                    min: 100,
                    step: 10
                }]
            }
        },
        generate: {
            label: translate('generateTree.Generate.Label')
        }
    }
    return (
        <Form form={form} initialValues={r}>
            <Collapse
                bordered={true} accordion={true}
                defaultActiveKey={[1]}
                expandIcon={({isActive}) => <CaretRightOutlined rotate={isActive ? 90 : 0}/>}
                className="site-collapse-custom-collapse">
                {CustomForm({onFieldsChange: console.log, parentDataStructure: LabelData})}
            </Collapse>
            <Button onClick={() => startGenerate(form)}
                    type={"primary"}>{LabelData.generate.label.toUpperCase()}</Button>
        </Form>
    );
}

export default withRouter(GenerateTree);
