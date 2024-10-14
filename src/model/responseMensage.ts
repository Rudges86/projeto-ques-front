export interface ResponseMensage {
  path?: string,
  method?: string,
  status?: string,
  statusText?: string,
  message: string;
}

export interface ErrorMessage {
  error: {
    path?: string,
    method?: string,
    status?: string,
    statusText?: string,
    message: string;
  }
}
