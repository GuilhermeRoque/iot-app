
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
class APIClient{
    static organizationsPath = '/organizations'
    static applicationsPath = '/applications'
    static loraProfilesPath = '/lora-profiles'
    static serviceProfilesPath = '/applications'
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
        const response = await this.api.get(path)
        return response.data 
    }  

    getApplications = async (organizationId) => {
        const path = this._getApplicationsPath(organizationId)
        const response = await this.api.get(path)
        return response.data 
    }  

    getLoraProfiles = async (organizationId) => {
        const path = this._getLoraProfilesPath(organizationId)
        const response = await this.api.get(path)
        return response.data 
    }  

    getServiceProfiles = async (organizationId) => {
        const path = this._getServiceProfilesPath(organizationId)
        const response = await this.api.get(path)
        return response.data 
    }  

    getDevices = async (organizationId, applicationId) => {
        const path = this._getDevicesPath(organizationId, applicationId)
        const response = await this.api.get(path)
        return response.data 
    }  

    deleteDeivce = async (organizationId, applicationId, deviceId) => {
        const path = this._getDevicesPath(organizationId, applicationId, deviceId)
        const response = await this.api.delete(path)
        return response.data 
    }  

    getOrganizationDeviceProfiles = async (organizationId) => {
        const path = this._getDeviceProfilesPath(organizationId)
        const response = await this.api.get(path)
        return response.data 
    }

    acceptMemberInvitation = async (organizationId, memberId) => {
        const path = this._getMembersPath(organizationId, memberId)
        const response = await this.api.put(path, {status: 0})
        return response.data
    }
    
    denyMemberInvitation = async (organizationId, memberId) => {
        const path = this._getMembersPath(organizationId, memberId)
        const response = await this.api.delete(path)
        return response.data
    }

    addMemberInvitation = async (organizationId, member) => {
        const path = this._getMembersPath(organizationId)
        const response = await this.api.post(path, member)
        return response.data
    }

}

export default APIClient