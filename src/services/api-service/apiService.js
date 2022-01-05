import axios from "axios";
import { apiUrl } from "@environment";

export const REQUEST_METHODS = {
  areaReport: "areaReport",
  polygon: "polygon",
  all: "all", // todo: maybe better routes
};

export const api = axios.create({
  baseURL: apiUrl,
});

export const fetchDataWithQuery = async ({
  queryKey: [
    dataPath,
    { params = {}, label = "שכבה", method, prefix = "" } = {},
  ] = [],
} = {}) => {
  const url = prefix + (method ? `/${method}/${dataPath}` : `/${dataPath}`);

  const res = await api.get(url, { params, label });

  return res.data;
};

export const fetchData = async (
  layerName,
  method,
  label = "שכבה",
  reqParams = {},
  props = {}
) => {
  const url =
    (props.prePath ?? "") +
    (method ? `/${method}/${layerName}` : `/${layerName}`);

  const res = await api.get(url, {
    params: reqParams,
    label: label,
  });

  return res.data;
};

export const postData = async (dataPath, body, options) => {
  const res = await api.post(dataPath, body, { options });

  return res.data;
};

export const putData = async (
  layerName,
  method,
  data,
  label = "שכבה",
  params = {}
) => {
  const url = `/${method}/${layerName}`;

  const res = await api.put(url, data, {
    params: params,
    label: label,
  });

  return res.data;
};
