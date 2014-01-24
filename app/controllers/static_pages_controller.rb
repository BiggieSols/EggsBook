class StaticPagesController < ApplicationController
  skip_before_filter :require_login

  def about
  end

  def contact
  end

  def landing
  end

  def feed
  end
end
