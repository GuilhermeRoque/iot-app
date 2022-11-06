class APIClient{
    constructor(api){
        this.api = api
    }
    
    getOrganizations = async () => {
        const response = await this.api.get('/organizations')
        return response.data 
    }  

    getApplications = async (oragnizationId) => {
        const response = await this.api.get('/organizations/'+oragnizationId+'/applications')
        return response.data 
    }  

    getLoraProfiles = async (oragnizationId) => {
        const response = await this.api.get('/organizations/'+oragnizationId+'/lora-profiles')
        return response.data 
    }  

    getServiceProfiles = async (oragnizationId) => {
        const response = await this.api.get('/organizations/'+oragnizationId+'/service-profiles')
        return response.data 
    }  

    getDevices = async (oragnizationId, applicationId) => {
        const response = await this.api.get('/organizations/'+oragnizationId+'/applications/' + applicationId + '/devices')
        return response.data 
    }  

    deleteDeivce = async (oragnizationId, applicationId, deviceId) => {
        const response = await this.api.delete('/organizations/'+oragnizationId+'/applications/' + applicationId + '/devices/' + deviceId)
        return response.data 
    }  

    getOrganizationDeviceProfiles = async (oragnizationId) => {
        const response = await this.api.get('/organizations/'+oragnizationId+'/device-profiles  ')
        return response.data 
    }


}

export default APIClient