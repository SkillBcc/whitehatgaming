import { Api } from "../enums/api";
import { KeyValue } from "./key-value";

export interface ApiRequest {
    api: Api;
    variables?: KeyValue[];
}
