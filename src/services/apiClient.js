
class PathUtils {
    static join(...paths){
        const pathsParsed = []
        for (const p of paths){
            if(p){
                pathsParsed.push(p.replaceAll('/',''))
            }
        }
        return pathsParsed.join('/')
    }
}

class APIError extends Error{
    constructor(error){
        const respMessage = error.response.data.message
        const status = error.response.status
        const message = respMessage?respMessage:APIError._getStatusMessageError(status)
        super(message)
    }

    static _getStatusMessageError(status){
        switch (status) {
            case 400:
                return "Request Error"        
            case 500:
                return "Internal Error"
            default:
                return "Unexpect Error"
        }
    }
}

class APIClient{
    static organizationsPath = '/organizations'
    static applicationsPath = '/applications'
    static loraProfilesPath = '/lora-profiles'
    static serviceProfilesPath = '/service-profiles'
    static deviceProfilesPath = '/device-profiles'
    static devicesPath = '/devices'
    static membersPath = '/members'

    constructor(api){
        this.api = api
    }

    _getOrganizationsPath(organizationId){
        return PathUtils.join(
            APIClient.organizationsPath,
            organizationId
        )
    }
    
    _getApplicationsPath(organizationId, applicationId=null){
        return PathUtils.join(
            APIClient.organizationsPath, 
            organizationId, 
            APIClient.applicationsPath, 
            applicationId
        )
    }

    _getLoraProfilesPath(organizationId, loraProfileId=null){
        return PathUtils.join(
            APIClient.organizationsPath, 
            organizationId, 
            APIClient.loraProfilesPath, 
            loraProfileId
        )
    }

    _getServiceProfilesPath(organizationId, serviceProfileId=null){
        return PathUtils.join(
            APIClient.organizationsPath,
            organizationId,
            APIClient.serviceProfilesPath, 
            serviceProfileId
        )
    }

    _getDeviceProfilesPath(organizationId){
        return PathUtils.join(
            APIClient.organizationsPath,
            organizationId,
            APIClient.deviceProfilesPath
        )
    }

    _getDevicesPath(organizationId, applicationId, deviceId=null){
        return PathUtils.join(
            APIClient.organizationsPath,
            organizationId,
            APIClient.applicationsPath, 
            applicationId, 
            APIClient.devicesPath, 
            deviceId
        )
    }

    _getMembersPath(organizationId, memberId=null){
        return PathUtils.join(
            APIClient.organizationsPath,
            organizationId,
            APIClient.membersPath,
            memberId
        )
    }

    getOrganizations = async (organizationId=null) => {
        const path = this._getOrganizationsPath(organizationId)
        try {
            const response = await this.api.get(path)
            return response.data                 
        } catch (error) {
            throw new APIError(error)                                                                                                                                                           
        }
    }  

    getOrganizationChildData = async (organizationId, childPath, childId=null) => {
        const path = this._getChildOrganizationPath(organizationId, childPath, childId)
        try {
            const response = await this.api.get(path)
            return response.data 
        } catch (error) {
            throw new APIError(error)                                                                                                                                               
        }
    }  

    deleteOrganizationChildData = async (organizationId, childPath, childId=null) => {
        const path = this._getChildOrganizationPath(organizationId, childPath, childId)
        try {
            const response = await this.api.delete(path)
            return response.data                 
        } catch (error) {
            throw new APIError(error)                                                                                                                                   
        }
    }  

    createOrganizationChildData = async (organizationId, childPath, childData) => {
        const path = this._getChildOrganizationPath(organizationId, childPath)
        try {
            const response = await this.api.post(path, childData)
            return response.data                 
        } catch (error) {
            throw new APIError(error)                                                                                                                       
        }
    }  
    updateOrganizationChildData = async (organizationId, childPath, childData, childId) => {
        const path = this._getChildOrganizationPath(organizationId, childPath, childId)
        try {
            const response = await this.api.put(path, childData)
            return response.data                 
        } catch (error) {
            throw new APIError(error)                                                                                                           
        }
    }  


    getApplications = async (organizationId) => {
        const path = this._getApplicationsPath(organizationId)
        try {            
            const response = await this.api.get(path)
            return response.data 
        } catch (error) {
            throw new APIError(error)                                                                                               
        }
    }  

    getLoraProfiles = async (organizationId) => {
        const path = this._getLoraProfilesPath(organizationId)
        try {
            const response = await this.api.get(path)
            return response.data                 
        } catch (error) {
            throw new APIError(error)                                                                                    
        }
    }  

    getServiceProfiles = async (organizationId) => {
        const path = this._getServiceProfilesPath(organizationId)
        try {
            const response = await this.api.get(path)
            return response.data                 
        } catch (error) {
            throw new APIError(error)                                                                        
        }
    }  


    createDevice = async (organizationId, applicationId, device) => {
        const path = this._getDevicesPath(organizationId, applicationId)
        try {
            const response = await this.api.post(path, device)
            return response.data                 
        } catch (error) {
            throw new APIError(error)                                                            
        }
    }  

    updateDevice = async (organizationId, applicationId, device, deviceId) => {
        const path = this._getDevicesPath(organizationId, applicationId, deviceId)
        try {
            const response = await this.api.put(path, device)
            return response.data                 
        } catch (error) {
            throw new APIError(error)                                                            
        }
    }  

    getDevices = async (organizationId, applicationId) => {
        const path = this._getDevicesPath(organizationId, applicationId)
        try {
            const response = await this.api.get(path)
            return response.data                 
        } catch (error) {
            throw new APIError(error)                                                            
        }
    }  

    deleteDeivce = async (organizationId, applicationId, deviceId) => {
        const path = this._getDevicesPath(organizationId, applicationId, deviceId)
        try {
            const response = await this.api.delete(path)
            return response.data 
        } catch (error) {
            throw new APIError(error)                                                
        }
    }  

    getOrganizationDeviceProfiles = async (organizationId) => {
        const path = this._getDeviceProfilesPath(organizationId)
        try {
            const response = await this.api.get(path)
            return response.data                 
        } catch (error) {
            throw new APIError(error)                                    
        }
    }

    acceptMemberInvitation = async (organizationId, memberId) => {
        const path = this._getMembersPath(organizationId, memberId)
        try {
            const response = await this.api.put(path, {status: 0})
            return response.data                
        } catch (error) {
            throw new APIError(error)                        
        }
    }
    
    denyMemberInvitation = async (organizationId, memberId) => {
        const path = this._getMembersPath(organizationId, memberId)
        try {
            const response = await this.api.delete(path)
            return response.data                
        } catch (error) {
            throw new APIError(error)            
        }

    }

    addMemberInvitation = async (organizationId, member) => {
        const path = this._getMembersPath(organizationId)
        try {
            const response = await this.api.post(path, member)
            return response.data                
        } catch (error) {
            throw new APIError(error)
        }
    }


    _getChildOrganizationPath(organizationId, childPath, childId) {
        return PathUtils.join(
            APIClient.organizationsPath,
            organizationId,
            childPath,
            childId
        )
    }
}

export default APIClient