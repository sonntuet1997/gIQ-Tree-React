import {translate} from "react3l/helpers/i18n";
import {Model} from "react3l/core";

export class GenerateTreeRequest extends Model {
    public InputData?: {
        AlignmentFile: string,
        UseExampleAlignmentFile: string,
        SequenceType: string,
        GeneticCode: string,
        PartitionFile: string,
        PartitionType: string
    }
    public SubstitutionOption?: {
        SubstitutionModel: string,
        FreeRateHeterogeneity: string,
        RateHeterogeneity: string,
        RateCategory: string,
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
}
