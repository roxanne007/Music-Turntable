/*
  ==============================================================================

    Track.cpp
    Created: 1 Aug 2021 11:41:10pm
    Author:  roxy

  ==============================================================================
*/

#include "Track.h"
#include <filesystem>

Track::Track(juce::File _file) : file(_file), 
                                 title(_file.getFileNameWithoutExtension()),
                                 URL(juce::URL{ _file })
{
    DBG("Created new track with title: " << title);
}

bool Track::operator==(const juce::String& other) const 
{
    return title == other;
}