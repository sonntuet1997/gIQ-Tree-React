import {Model} from "react3l/core";

export class GenerateTreeRequest extends Model {
    public InputData?: {
        AlignmentFile: string,
        UseExampleAlignmentFile: boolean,
        SequenceType: string,
        GeneticCode: string,
        PartitionFile: string,
        PartitionType: string
    }
    public SubstitutionOption?: {
        SubstitutionModel: string,
        FreeRateHeterogeneity: string,
        RateHeterogeneity: string,
        RateCategory: number,
        StateFrequency: string,
        AscertainmentCorrection: string
    }
    public BranchSupportAnalysis?: {
        BootstrapAnalysis: string,
        NumberBootstrap: string,
        CreateUfBootFile: string,
        MaxIteration: string,
        MinCorrelation: string,
        SingleBranchTest: {
            SHaLRTTest: string,
            Replicates: string,
            ApproximateBayes: string
        }
    }
    public SearchParameters?: {
        PerturbationStrength: string,
        StoppingRule: string
    }

    public constructor() {
        super();
    }
}
