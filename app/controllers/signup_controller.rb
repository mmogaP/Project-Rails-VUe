class SignupController < ApplicationController
  def create
    user = User.new(user_params)

    if user.save
      #assign a payload to the user id
      payload = {user_id: user.id}
      #create a new session with the payload
      session = JWTSessions::Session.new(payload: payload, refresh_by_acces_allowed: true)
      #login the user
      tokens =  session.login

      #set the cookies
      response.set_cookie(
        JWTSessions.access_cookie, 
        value: tokens[:access],
        httponly: true,
        secure: Rails.env.production?
      )

      #render the csrf token
      render json: {csrf: tokens[:csrf]}
    else
      #render the error
      render json: { error: user.errors.full_messages.join(' ') }, status: :unprocessable_entity
    end
  end

  private 

    def user_params 
      params.permit(:email, :password, :password_confirmation)
    end
end
